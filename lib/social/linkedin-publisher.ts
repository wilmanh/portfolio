import "server-only";
import type { BlogPost } from "@/lib/blog/types";
import type { SocialConnection, SocialPublisher } from "./types";

const plainText = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
export class LinkedInPublisher implements SocialPublisher {
  readonly platform = "linkedin" as const;
  async publish(post: BlogPost, connection: SocialConnection) {
    if (connection.expiresAt && new Date(connection.expiresAt) <= new Date()) throw new Error("La conexión de LinkedIn expiró. Vuelve a conectarla.");
    const commentary = `${post.title}\n\n${post.excerpt}\n\n${plainText(post.content)}`.slice(0, 2800);
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", { method: "POST", headers: { Authorization: `Bearer ${connection.accessToken}`, "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0" }, body: JSON.stringify({ author: `urn:li:person:${connection.accountId}`, lifecycleState: "PUBLISHED", specificContent: { "com.linkedin.ugc.ShareContent": { shareCommentary: { text: commentary }, shareMediaCategory: "NONE" } }, visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" } }) });
    if (!response.ok) throw new Error(`LinkedIn rechazó la publicación (${response.status}).`);
    return { externalId: response.headers.get("x-restli-id") ?? `linkedin-${Date.now()}` };
  }
}
