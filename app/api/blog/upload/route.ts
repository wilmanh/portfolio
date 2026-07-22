import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
export const runtime = "nodejs";
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const extensions: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/gif": "gif" };
export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const form = await request.formData();
    const entry = form.get("file");
    if (!(entry instanceof File) || !allowedTypes.has(entry.type)) return NextResponse.json({ error: "Formato no permitido" }, { status: 400 });
    if (entry.size > 5 * 1024 * 1024) return NextResponse.json({ error: "La imagen no puede superar 5 MB" }, { status: 400 });

    const filename = `${randomUUID()}.${extensions[entry.type]}`;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`blog/${filename}`, entry, { access: "public", contentType: entry.type, addRandomSuffix: false });
      return NextResponse.json({ url: blob.url });
    }

    if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "El almacenamiento de imágenes no está configurado." }, { status: 503 });
    const directory = path.join(process.cwd(), "public", "uploads");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, filename), Buffer.from(await entry.arrayBuffer()));
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error al subir imagen del blog", error);
    return NextResponse.json({ error: "No se pudo guardar la imagen. Revisa la configuración de almacenamiento." }, { status: 500 });
  }
}
