import "server-only";
import type { BlogPost } from "@/lib/blog/types";
import type { SocialConnection, SocialPublisher } from "./types";

const plainText = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const firstImage = (html: string) => html.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
const linkedinVersion = process.env.LINKEDIN_VERSION ?? "202606";

class LinkedInApiError extends Error {
  constructor(status: number, details: string) {
    super(`LinkedIn rechazó la publicación (${status})${details ? `: ${details}` : "."}`);
    this.name = "LinkedInApiError";
  }
}

export class LinkedInPublisher implements SocialPublisher {
  readonly platform = "linkedin" as const;

  private async uploadImage(imageUrl: string, connection: SocialConnection) {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error(`No se pudo descargar la imagen del artículo (${imageResponse.status}).`);

    const contentType = imageResponse.headers.get("content-type")?.split(";")[0] ?? "";
    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(contentType)) {
      throw new Error("La imagen del artículo tiene un formato no compatible con LinkedIn.");
    }

    const initializeResponse = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${connection.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "Linkedin-Version": linkedinVersion,
      },
      body: JSON.stringify({ initializeUploadRequest: { owner: `urn:li:person:${connection.accountId}` } }),
    });
    if (!initializeResponse.ok) throw new LinkedInApiError(initializeResponse.status, "No se pudo inicializar la carga de la imagen.");

    const initializeBody = await initializeResponse.json() as { value?: { uploadUrl?: string; image?: string } };
    const uploadUrl = initializeBody.value?.uploadUrl;
    const imageUrn = initializeBody.value?.image;
    if (!uploadUrl || !imageUrn) throw new Error("LinkedIn no devolvió los datos para cargar la imagen.");

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: await imageResponse.arrayBuffer(),
    });
    if (!uploadResponse.ok) throw new LinkedInApiError(uploadResponse.status, "LinkedIn rechazó la carga de la imagen.");
    return imageUrn;
  }

  async publish(post: BlogPost, connection: SocialConnection) {
    if (connection.expiresAt && new Date(connection.expiresAt) <= new Date()) throw new Error("La conexión de LinkedIn expiró. Vuelve a conectarla.");
    const commentary = `${post.title}\n\n${post.excerpt}\n\n${plainText(post.content)}`.slice(0, 2800);
    const imageMatch = firstImage(post.content);
    const imageUrn = imageMatch
      ? await this.uploadImage(new URL(imageMatch[1], process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").toString(), connection)
      : null;
    const content = imageUrn ? { media: { altText: imageMatch?.[0].match(/\balt=["']([^"']*)["']/i)?.[1] ?? post.title, id: imageUrn } } : undefined;
    const response = await fetch("https://api.linkedin.com/rest/posts", { method: "POST", headers: { Authorization: `Bearer ${connection.accessToken}`, "Content-Type": "application/json", "X-Restli-Protocol-Version": "2.0.0", "Linkedin-Version": linkedinVersion }, body: JSON.stringify({ author: `urn:li:person:${connection.accountId}`, commentary, visibility: "PUBLIC", distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] }, ...(content ? { content } : {}), lifecycleState: "PUBLISHED", isReshareDisabledByAuthor: false }) });
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
