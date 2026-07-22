"use client";

import { useState } from "react";
import { Button, Control, Field, Input, Label, Notification, Textarea } from "react-ui-vegetas-wife";
import { RichTextEditor } from "@/components/rich-text-editor";

type BlogPostFormProps = {
  action: (formData: FormData) => void | Promise<void>;
};

const plainText = (html: string) => html.replace(/<[^>]*>/g, "").trim();
const containsImage = (html: string) => /<img\b/i.test(html);

export function BlogPostForm({ action }: BlogPostFormProps) {
  const [error, setError] = useState<string | null>(null);

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const excerpt = String(data.get("excerpt") ?? "").trim();
    const rawContent = String(data.get("content") ?? "");
    const content = plainText(rawContent);

    if (title.length < 4) return "El título debe tener al menos 4 caracteres.";
    if (excerpt.length < 10) return "El resumen debe tener al menos 10 caracteres.";
    if (content.length < 30 && !containsImage(rawContent)) return "El contenido debe tener al menos 30 caracteres.";
    return null;
  };

  return (
    <form
      action={action}
      onSubmit={(event) => {
        const message = validate(event.currentTarget);
        if (message) {
          event.preventDefault();
          setError(message);
        } else {
          setError(null);
        }
      }}
      onInput={() => setError(null)}
    >
      {error && (
        <Notification color="danger" role="alert">
          {error}
        </Notification>
      )}
      <Field>
        <Label htmlFor="title">Título</Label>
        <Control>
          <Input id="title" name="title" required minLength={4} placeholder="Una idea que merece ser compartida" />
        </Control>
      </Field>
      <Field>
        <Label htmlFor="excerpt">Resumen</Label>
        <Control>
          <Textarea id="excerpt" name="excerpt" required minLength={10} rows={3} placeholder="Una introducción breve para la tarjeta..." />
        </Control>
      </Field>
      <Field>
        <Label htmlFor="content">Contenido</Label>
        <Control>
          <RichTextEditor name="content" required />
        </Control>
      </Field>
      <Button color="primary" type="submit" size="large">
        Publicar entrada →
      </Button>
    </form>
  );
}
