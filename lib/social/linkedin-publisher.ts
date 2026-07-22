import "server-only";
import type { BlogPost } from "@/lib/blog/types";
import type { SocialConnection, SocialPublisher } from "./types";

const plainText = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const linkedinVersion = process.env.LINKEDIN_VERSION ?? "202606";

class LinkedInApiError extends Error {
  constructor(status: number, details: string) {
    super(`LinkedIn rechazó la publicación (${status})${details ? `: ${details}` : "."}`);
    this.name = "LinkedInApiError";
  }
}

export class LinkedInPublisher implements SocialPublisher {
  readonly platform = "linkedin" as const;
  async publish(post: BlogPost, connection: SocialConnection) {
    if (connection.expiresAt && new Date(connection.expiresAt) <= new Date()) throw new Error("La conexión de LinkedIn expiró. Vuelve a conectarla.");
    const commentary = `${post.title}\n\n${post.excerpt}\n\n${plainText(post.content)}`.slice(0, 2800);
    const response = await fetch("https://api.linkedin.com/rest/posts", { method: "POST", headers: { Authorization: `Bearer ${connection.accessToken}`, "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0", "Linkedin-Version": linkedinVersion }, body: JSON.stringify({ author: `urn:li:person:${connection.accountId}`, commentary, visibility: "PUBLIC", distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] }, lifecycleState: "PUBLISHED", isReshareDisabledByAuthor: false }) });
    if (!response.ok) {
      let details = "";
      try {
        const body = await response.json() as { message?: string; error?: string; status?: number };
        details = body.message ?? body.error ?? "";
      } catch {
        // LinkedIn puede devolver una respuesta vacía o no JSON.
      }
      throw new LinkedInApiError(response.status, details);
    }
    return { externalId: response.headers.get("x-restli-id") ?? `linkedin-${Date.now()}` };
  }
}
