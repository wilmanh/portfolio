import "server-only";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { decryptSecret, encryptSecret } from "./crypto";
import type { SocialConnection, SocialConnectionRepository, SocialPlatform, SocialPublication } from "./types";

type ConnectionRow = { platform: SocialPlatform; account_id: string; account_name: string | null; access_token: string; expires_at: string | null; connected_at: string };
type PublicationRow = { post_id: number; platform: SocialPlatform; external_id: string | null; status: "published" | "failed"; error: string | null; published_at: string | null };
export class SqliteSocialConnectionRepository implements SocialConnectionRepository {
  private db: DatabaseSync;
  constructor(filename = process.env.BLOG_DATABASE_PATH ?? path.join(process.cwd(), "data", "blog.db")) { fs.mkdirSync(path.dirname(filename), { recursive: true }); this.db = new DatabaseSync(filename); this.db.exec("CREATE TABLE IF NOT EXISTS social_connections (platform TEXT PRIMARY KEY, account_id TEXT NOT NULL, account_name TEXT, access_token TEXT NOT NULL, expires_at TEXT, connected_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS social_publications (post_id INTEGER NOT NULL, platform TEXT NOT NULL, external_id TEXT, status TEXT NOT NULL, error TEXT, published_at TEXT, PRIMARY KEY (post_id, platform));"); }
  async getConnection(platform: SocialPlatform) { const row = this.db.prepare("SELECT * FROM social_connections WHERE platform = ?").get(platform) as unknown as ConnectionRow | undefined; return row ? { platform: row.platform, accountId: row.account_id, accountName: row.account_name, accessToken: decryptSecret(row.access_token), expiresAt: row.expires_at, connectedAt: row.connected_at } : null; }
  async saveConnection(connection: SocialConnection) { this.db.prepare("INSERT INTO social_connections (platform,account_id,account_name,access_token,expires_at,connected_at) VALUES (?,?,?,?,?,?) ON CONFLICT(platform) DO UPDATE SET account_id=excluded.account_id, account_name=excluded.account_name, access_token=excluded.access_token, expires_at=excluded.expires_at, connected_at=excluded.connected_at").run(connection.platform, connection.accountId, connection.accountName, encryptSecret(connection.accessToken), connection.expiresAt, connection.connectedAt); }
  async savePublication(publication: SocialPublication) { this.db.prepare("INSERT INTO social_publications (post_id,platform,external_id,status,error,published_at) VALUES (?,?,?,?,?,?) ON CONFLICT(post_id,platform) DO UPDATE SET external_id=excluded.external_id,status=excluded.status,error=excluded.error,published_at=excluded.published_at").run(publication.postId, publication.platform, publication.externalId, publication.status, publication.error, publication.publishedAt); }
  async getPublication(postId: number, platform: SocialPlatform) { const row = this.db.prepare("SELECT * FROM social_publications WHERE post_id = ? AND platform = ?").get(postId, platform) as unknown as PublicationRow | undefined; return row ? { postId: row.post_id, platform: row.platform, externalId: row.external_id, status: row.status, error: row.error, publishedAt: row.published_at } : null; }
}
