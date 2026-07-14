import { Button, Container, Control, Field, Input, Label, Notification, Textarea } from "react-ui-vegetas-wife";

import { redirect } from "next/navigation";
import Link from "next/link";

import { isAuthenticated } from "@/lib/auth";

import { createPost, logout } from "../actions";
import { RichTextEditor } from "@/components/rich-text-editor";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!(await isAuthenticated())) redirect("/blog/login");
  const { error } = await searchParams;
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">Panel editorial</p>
          <h1 className="display-title gradient-text">Nueva entrada.</h1>
          <form action={logout}>
            <Button type="submit" outlined>
              Cerrar sesión
            </Button>
          </form>
          <br />
          <Link href="/blog/admin/social/linkedin">Configurar LinkedIn →</Link>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="admin-form glass">
            {error && (
              <Notification color="danger">
                Revisa los campos: título (4+), resumen (10+) y contenido (30+ caracteres). Puedes insertar imágenes desde una URL o subirlas desde tu equipo.
              </Notification>
            )}
            <form action={createPost}>
              <Field>
                <Label htmlFor="title">Título</Label>
                <Control>
                  <Input
                    id="title"
                    name="title"
                    required
                    minLength={4}
                    placeholder="Una idea que merece ser compartida"
                  />
                </Control>
              </Field>
              <Field>
                <Label htmlFor="excerpt">Resumen</Label>
                <Control>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    minLength={10}
                    rows={3}
                    placeholder="Una introducción breve para la tarjeta..."
                  />
                </Control>
              </Field>
              <Field><Label htmlFor="content">Contenido</Label><Control><RichTextEditor name="content" required /></Control></Field>
              <Button color="primary" type="submit" size="large">
                Publicar entrada →
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
