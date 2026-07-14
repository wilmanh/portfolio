import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
export const runtime = "nodejs";
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const extensions: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif" };
export async function POST(request: Request) { if (!(await isAuthenticated())) return NextResponse.json({ error: "No autorizado" }, { status: 401 }); const form = await request.formData(); const entry = form.get("file"); if (!(entry instanceof File) || !allowedTypes.has(entry.type)) return NextResponse.json({ error: "Formato no permitido" }, { status: 400 }); if (entry.size > 5 * 1024 * 1024) return NextResponse.json({ error: "La imagen no puede superar 5 MB" }, { status: 400 }); const filename = `${randomUUID()}.${extensions[entry.type]}`; const directory = path.join(process.cwd(), "public", "uploads"); await mkdir(directory, { recursive: true }); await writeFile(path.join(directory, filename), Buffer.from(await entry.arrayBuffer())); return NextResponse.json({ url: `/uploads/${filename}` }); }
