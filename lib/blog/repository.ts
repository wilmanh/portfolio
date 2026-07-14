import "server-only";
import type { BlogRepository } from "./types";
import { SqliteBlogRepository } from "./sqlite-blog-repository";
let repository:BlogRepository|undefined;
export function getBlogRepository():BlogRepository { repository??=new SqliteBlogRepository(); return repository; }
