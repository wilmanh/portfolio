import "server-only";

import { neon } from "@neondatabase/serverless";

import type { BlogPost, BlogRepository, NewBlogPost } from "./types";

type Row = { id: number | string; slug: string; title: string; excerpt: string; content: string; created_at: string; published: boolean };

const toPost = (row: Row): BlogPost => ({ ...row, id: Number(row.id), createdAt: row.created_at, published: Boolean(row.published) });
const slugify = (title: string) => title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);

export class NeonBlogRepository implements BlogRepository {
  private readonly sql;
  private schema: Promise<void> | undefined;

  constructor(databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) throw new Error("DATABASE_URL es obligatoria para usar Neon.");
    this.sql = neon(databaseUrl);
  }

  private ensureSchema() {
    this.schema ??= this.sql`CREATE TABLE IF NOT EXISTS posts (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL,
      published BOOLEAN NOT NULL DEFAULT TRUE
    )`.then(() => undefined);
    return this.schema;
  }

  async findPublished() { await this.ensureSchema(); return (await this.sql`SELECT * FROM posts WHERE published = TRUE ORDER BY created_at DESC` as Row[]).map(toPost); }
  async findBySlug(slug: string) { await this.ensureSchema(); const [row] = await this.sql`SELECT * FROM posts WHERE slug = ${slug} AND published = TRUE` as Row[]; return row ? toPost(row) : null; }
  async findById(id: number) { await this.ensureSchema(); const [row] = await this.sql`SELECT * FROM posts WHERE id = ${id} AND published = TRUE` as Row[]; return row ? toPost(row) : null; }
  async create(post: NewBlogPost) {
    await this.ensureSchema();
    const slug = `${slugify(post.title) || "entrada"}-${Date.now().toString(36)}`;
    const [row] = await this.sql`INSERT INTO posts (slug, title, excerpt, content, created_at, published) VALUES (${slug}, ${post.title}, ${post.excerpt}, ${post.content}, NOW(), TRUE) RETURNING *` as Row[];
    return toPost(row);
  }
}
