import { Button, Container, Notification } from "react-ui-vegetas-wife";

import { redirect } from "next/navigation";
import Link from "next/link";

import { isAuthenticated } from "@/lib/auth";

import { createPost, logout } from "../actions";
import { BlogPostForm } from "@/components/blog-post-form";

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
                Revisa los campos: título (4+), resumen (10+) y contenido (30+ caracteres, salvo que incluya una imagen). Puedes insertar imágenes desde una URL o subirlas desde tu equipo.
              </Notification>
            )}
            <BlogPostForm action={createPost} />
          </div>
        </Container>
      </section>
    </>
  );
}
