import "server-only";
import type { BlogRepository } from "./types";
import { SqliteBlogRepository } from "./sqlite-blog-repository";
import { NeonBlogRepository } from "./neon-blog-repository";
let repository: BlogRepository | undefined;
export function getBlogRepository(): BlogRepository { repository ??= process.env.DATABASE_URL ? new NeonBlogRepository() : new SqliteBlogRepository(); return repository; }
