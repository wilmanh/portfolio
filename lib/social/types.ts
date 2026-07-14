import type { BlogPost } from "@/lib/blog/types";

export const socialPlatforms = ["linkedin", "facebook", "instagram"] as const;
export type SocialPlatform = (typeof socialPlatforms)[number];
export type SocialConnection = { platform: SocialPlatform; accountId: string; accountName: string | null; accessToken: string; expiresAt: string | null; connectedAt: string };
export type SocialPublication = { postId: number; platform: SocialPlatform; externalId: string | null; status: "published" | "failed"; error: string | null; publishedAt: string | null };
export interface SocialConnectionRepository { getConnection(platform: SocialPlatform): Promise<SocialConnection | null>; saveConnection(connection: SocialConnection): Promise<void>; savePublication(publication: SocialPublication): Promise<void>; getPublication(postId: number, platform: SocialPlatform): Promise<SocialPublication | null>; }
export interface SocialPublisher { readonly platform: SocialPlatform; publish(post: BlogPost, connection: SocialConnection): Promise<{ externalId: string }>; }
