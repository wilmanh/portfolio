import "server-only";

import { neon } from "@neondatabase/serverless";

import { decryptSecret, encryptSecret } from "./crypto";
import type { SocialConnection, SocialConnectionRepository, SocialPlatform, SocialPublication } from "./types";

type ConnectionRow = { platform: SocialPlatform; account_id: string; account_name: string | null; access_token: string; expires_at: string | null; connected_at: string };
type PublicationRow = { post_id: number | string; platform: SocialPlatform; external_id: string | null; status: "published" | "failed"; error: string | null; published_at: string | null };

export class NeonSocialConnectionRepository implements SocialConnectionRepository {
  private readonly sql;
  private schema: Promise<void> | undefined;

  constructor(databaseUrl = process.env.DATABASE_URL) {
    if (!databaseUrl) throw new Error("DATABASE_URL es obligatoria para usar Neon.");
    this.sql = neon(databaseUrl);
  }

  private ensureSchema() {
    this.schema ??= Promise.all([
      this.sql`CREATE TABLE IF NOT EXISTS social_connections (
        platform TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        account_name TEXT,
        access_token TEXT NOT NULL,
        expires_at TIMESTAMPTZ,
        connected_at TIMESTAMPTZ NOT NULL
      )`,
      this.sql`CREATE TABLE IF NOT EXISTS social_publications (
        post_id BIGINT NOT NULL,
        platform TEXT NOT NULL,
        external_id TEXT,
        status TEXT NOT NULL,
        error TEXT,
        published_at TIMESTAMPTZ,
        PRIMARY KEY (post_id, platform)
      )`,
    ]).then(() => undefined);
    return this.schema;
  }

  async getConnection(platform: SocialPlatform) { await this.ensureSchema(); const [row] = await this.sql`SELECT * FROM social_connections WHERE platform = ${platform}` as ConnectionRow[]; return row ? { platform: row.platform, accountId: row.account_id, accountName: row.account_name, accessToken: decryptSecret(row.access_token), expiresAt: row.expires_at, connectedAt: row.connected_at } : null; }
  async saveConnection(connection: SocialConnection) { await this.ensureSchema(); await this.sql`INSERT INTO social_connections (platform, account_id, account_name, access_token, expires_at, connected_at) VALUES (${connection.platform}, ${connection.accountId}, ${connection.accountName}, ${encryptSecret(connection.accessToken)}, ${connection.expiresAt}, ${connection.connectedAt}) ON CONFLICT (platform) DO UPDATE SET account_id = EXCLUDED.account_id, account_name = EXCLUDED.account_name, access_token = EXCLUDED.access_token, expires_at = EXCLUDED.expires_at, connected_at = EXCLUDED.connected_at`; }
  async savePublication(publication: SocialPublication) { await this.ensureSchema(); await this.sql`INSERT INTO social_publications (post_id, platform, external_id, status, error, published_at) VALUES (${publication.postId}, ${publication.platform}, ${publication.externalId}, ${publication.status}, ${publication.error}, ${publication.publishedAt}) ON CONFLICT (post_id, platform) DO UPDATE SET external_id = EXCLUDED.external_id, status = EXCLUDED.status, error = EXCLUDED.error, published_at = EXCLUDED.published_at`; }
  async getPublication(postId: number, platform: SocialPlatform) { await this.ensureSchema(); const [row] = await this.sql`SELECT * FROM social_publications WHERE post_id = ${postId} AND platform = ${platform}` as PublicationRow[]; return row ? { postId: Number(row.post_id), platform: row.platform, externalId: row.external_id, status: row.status, error: row.error, publishedAt: row.published_at } : null; }
}
