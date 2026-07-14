import "server-only";
import type { SocialConnectionRepository } from "./types";
import { SqliteSocialConnectionRepository } from "./sqlite-social-repository";
let repository: SocialConnectionRepository | undefined;
export function getSocialRepository() { repository ??= new SqliteSocialConnectionRepository(); return repository; }
