import type { Metadata } from "next";
import { Zap } from "react-feather";
import { Button, Container } from "react-ui-vegetas-wife";

import Link from "next/link";

import { LanguageText } from "@/components/language-text";
import en from "@/lang/en";
import es from "@/lang/es";
import { getBlogRepository } from "@/lib/blog/repository";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas sobre frontend, arquitectura, liderazgo y productos digitales.",
};
export const dynamic = "force-dynamic";
const date = (value: string) =>
  new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
export default async function BlogPage() {
  const posts = await getBlogRepository().findPublished();
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">
            <LanguageText es={es.blog.eyebrow} en={en.blog.eyebrow} />
          </p>
          <h1 className="display-title gradient-text">
            <LanguageText es={es.blog.title} en={en.blog.title} />
          </h1>
          <p className="muted">
            <LanguageText es={es.blog.description} en={en.blog.description} />
          </p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          {posts.length ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <article className="blog-card glass" key={post.id}>
                  <div className="blog-card-accent" />
                  <div className="blog-card-body">
                    <span className="blog-meta">
                      {date(post.createdAt)} · {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))}{" "}
                      <LanguageText es={es.blog.minutes} en={en.blog.minutes} />
                    </span>
                    <h2>{post.title}</h2>
                    <p className="muted">{post.excerpt}</p>
                    <br />
                    <Link href={`/blog/${post.slug}`}>
                      <LanguageText es={es.blog.read} en={en.blog.read} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-orbit">
                <Zap size={48} />
              </div>
              <h2 className="section-heading">
                <LanguageText es={es.blog.emptyTitle} en={en.blog.emptyTitle} />
              </h2>
              <p className="muted">
                <LanguageText es={es.blog.empty} en={en.blog.empty} />
              </p>
            </div>
          )}
          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <Link href="/blog/admin">
              <Button outlined>
                <LanguageText es={es.blog.create} en={en.blog.create} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
