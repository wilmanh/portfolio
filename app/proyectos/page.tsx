import type { Metadata } from "next";
import { BookOpen, ExternalLink, Globe, GitHub } from "react-feather";
import { Container } from "react-ui-vegetas-wife";

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
          <article className="project-card glass">
            <div className="project-card-icon">
              <GitHub size={30} />
            </div>
            <div className="project-card-content">
              <span className="blog-meta">React · Bulma CSS · TypeScript</span>
              <h2>{es.projects.vegeta.title}</h2>
              <p className="muted">
                <LanguageText es={es.projects.vegeta.description} en={en.projects.vegeta.description} />
              </p>
              <div className="project-links">
                <a href="https://github.com/wilmanh/react-vegeta-s-wife" target="_blank" rel="noreferrer">
                  <GitHub size={17} />
                  <LanguageText es={es.projects.vegeta.repository} en={en.projects.vegeta.repository} />
                  <ExternalLink size={14} />
                </a>
                <a
                  href="https://wilmanh.github.io/react-vegeta-s-wife/?path=/docs/bulma-components-breadcrumbs--docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BookOpen size={17} />
                  <LanguageText es={es.projects.vegeta.documentation} en={en.projects.vegeta.documentation} />
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
          <article className="project-card glass">
            <div className="project-card-icon">
              <GitHub size={30} />
            </div>
            <div className="project-card-content">
              <span className="blog-meta">Next.js · React · TypeScript</span>
              <h2>{es.projects.portfolio.title}</h2>
              <p className="muted">
                <LanguageText es={es.projects.portfolio.description} en={en.projects.portfolio.description} />
              </p>
              <div className="project-links">
                <a href="https://github.com/wilmanh/portfolio" target="_blank" rel="noreferrer">
                  <GitHub size={17} />
                  <LanguageText es={es.projects.portfolio.repository} en={en.projects.portfolio.repository} />
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
          <article className="project-card glass">
            <div className="project-card-icon">
              <Globe size={30} />
            </div>
            <div className="project-card-content">
              <span className="blog-meta">Web · Game</span>
              <h2>{es.projects.balloonRaider.title}</h2>
              <p className="muted">
                <LanguageText
                  es={es.projects.balloonRaider.description}
                  en={en.projects.balloonRaider.description}
                />
              </p>
              <div className="project-links">
                <a href="https://balloonraider.app/" target="_blank" rel="noreferrer">
                  <Globe size={17} />
                  <LanguageText es={es.projects.balloonRaider.website} en={en.projects.balloonRaider.website} />
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
