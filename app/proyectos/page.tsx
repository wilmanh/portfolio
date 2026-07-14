import type { Metadata } from "next";
import { Package } from "react-feather";
import { Button, Container } from "react-ui-vegetas-wife";

import Link from "next/link";

import { LanguageText } from "@/components/language-text";
import en from "@/lang/en";
import es from "@/lang/es";

export const metadata: Metadata = { title: "Proyectos" };
export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">
            <LanguageText es={es.projects.eyebrow} en={en.projects.eyebrow} />
          </p>
          <h1 className="display-title gradient-text">
            <LanguageText es="Proyectos." en="Projects" />
          </h1>
          <p className="muted">
            <LanguageText es={es.projects.description} en={en.projects.description} />
          </p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="empty-state">
            <div className="empty-orbit">
              <Package size={48} />
            </div>
            <h2 className="section-heading">
              <LanguageText es={es.projects.comingSoon} en={en.projects.comingSoon} />
            </h2>
            <p className="muted">
              <LanguageText es={es.projects.empty} en={en.projects.empty} />
            </p>
            <br />
            <Link href="/contacto">
              <Button color="primary">
                <LanguageText es={es.projects.cta} en={en.projects.cta} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
