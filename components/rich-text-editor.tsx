"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useRef, useState } from "react";
import { Bold, Code, Image as ImageIcon, Italic, Link as LinkIcon, List, Menu, MessageSquare, Upload } from "react-feather";

export function RichTextEditor({ name, required }: { name: string; required?: boolean }) {
  const [html, setHtml] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({ extensions: [StarterKit, Image.configure({ allowBase64: false }), Link.configure({ openOnClick: false })], immediatelyRender: false, editorProps: { attributes: { class: "rich-editor-content", "aria-label": "Contenido de la entrada" } }, onUpdate: ({ editor: instance }) => setHtml(instance.getHTML()) });
  if (!editor) return <div className="rich-editor-loading">Cargando editor…</div>;
  const addImageUrl = () => { const url = window.prompt("URL de la imagen"); if (url?.trim()) editor.chain().focus().setImage({ src: url.trim() }).run(); };
  const uploadImage = async (file: File) => { setUploading(true); try { const body = new FormData(); body.append("file", file); const response = await fetch("/api/blog/upload", { method: "POST", body }); const raw = await response.text(); let result: { url?: string; error?: string } = {}; try { result = raw ? JSON.parse(raw) as typeof result : {}; } catch { /* El servidor/proxy pudo devolver una respuesta no JSON. */ } if (!response.ok || !result.url) throw new Error(result.error ?? `No se pudo subir la imagen (HTTP ${response.status})`); editor.chain().focus().setImage({ src: result.url, alt: file.name }).run(); } catch (error) { window.alert(error instanceof Error ? error.message : "No se pudo subir la imagen"); } finally { setUploading(false); } };
  const command = (action: () => void) => action();
  return <div className="rich-editor-wrap"><div className="rich-editor-toolbar" aria-label="Herramientas de formato">
    <button type="button" onClick={() => command(() => editor.chain().focus().toggleBold().run())} className={editor.isActive("bold") ? "is-active" : ""} aria-label="Negrita"><Bold size={16} /></button>
    <button type="button" onClick={() => command(() => editor.chain().focus().toggleItalic().run())} className={editor.isActive("italic") ? "is-active" : ""} aria-label="Cursiva"><Italic size={16} /></button><span className="editor-divider" />
    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""} aria-label="Lista"><List size={16} /></button>
    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""} aria-label="Lista numerada"><Menu size={16} /></button>
    <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""} aria-label="Cita"><MessageSquare size={16} /></button>
    <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "is-active" : ""} aria-label="Código"><Code size={16} /></button><span className="editor-divider" />
    <button type="button" onClick={addImageUrl} aria-label="Insertar imagen por URL"><ImageIcon size={16} /></button>
    <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} aria-label="Subir imagen"><Upload size={16} /></button>
    <button type="button" onClick={() => { const url = window.prompt("URL del enlace"); if (url) editor.chain().focus().setLink({ href: url }).run(); }} aria-label="Insertar enlace"><LinkIcon size={16} /></button>
    <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file); event.target.value = ""; }} />
  </div><EditorContent editor={editor} />{uploading && <p className="editor-status">Subiendo imagen…</p>}<input type="hidden" name={name} value={html} required={required} /></div>;
}
