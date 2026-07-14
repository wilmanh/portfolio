import "server-only";
import type { SocialConnectionRepository } from "./types";
import { SqliteSocialConnectionRepository } from "./sqlite-social-repository";
import { NeonSocialConnectionRepository } from "./neon-social-repository";
let repository: SocialConnectionRepository | undefined;
export function getSocialRepository() { repository ??= process.env.DATABASE_URL ? new NeonSocialConnectionRepository() : new SqliteSocialConnectionRepository(); return repository; }
