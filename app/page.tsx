import { Button, Container, Tag, Tags } from "react-ui-vegetas-wife";

import Image from "next/image";
import Link from "next/link";

import { LanguageText } from "@/components/language-text";
import en from "@/lang/en";
import es from "@/lang/es";

export default function Home() {
  return (
    <>
      <section className="hero-home">
        <Container>
          <div className="hero-grid">
            <div>
              <p className="eyebrow">
                <LanguageText es={es.home.eyebrow} en={en.home.eyebrow} />
              </p>
              <h1 className="display-title hero-title">
                <LanguageText es={es.home.titleStart} en={en.home.titleStart} />
                <span className="gradient-text">
                  <LanguageText es={es.home.titleEnd} en={en.home.titleEnd} />
                </span>
              </h1>
              <p className="hero-copy">
                <LanguageText es={es.home.intro} en={en.home.intro} />
              </p>
              <div className="hero-actions">
                <Link href="/contacto">
                  <Button color="primary" size="large">
                    <LanguageText es={es.home.contactCta} en={en.home.contactCta} />
                  </Button>
                </Link>
                <Link href="#experiencia">
                  <Button outlined size="large">
                    <LanguageText es={es.home.experienceCta} en={en.home.experienceCta} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="portrait-card glass">
              <span className="availability">
                <LanguageText es={es.home.availability} en={en.home.availability} />
              </span>
              <figure className="image">
                <Image
                  className="portrait-logo"
                  src="/sirius-alpha-logo.png"
                  alt="Identidad visual Sirius Alpha"
                  width={420}
                  height={420}
                  priority
                />
              </figure>
              <div className="metrics">
                <div className="metric">
                  <strong>10+</strong>
                  <span><LanguageText es={es.home.years} en={en.home.years} /></span>
                </div>
                <div className="metric">
                  <strong>5</strong>
                  <span>
                    <LanguageText es={es.home.roles} en={en.home.roles} />
                  </span>
                </div>
                <div className="metric">
                  <strong>∞</strong>
                  <span><LanguageText es={es.home.curiosity} en={en.home.curiosity} /></span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <p className="eyebrow">
            <LanguageText es={es.home.skillsEyebrow} en={en.home.skillsEyebrow} />
          </p>
          <h2 className="section-heading">
            <LanguageText es={es.home.skillsTitle} en={en.home.skillsTitle} />
          </h2>
          <div className="skills-grid">
            {es.home.skills.map((skill, i) => (
              <article className="skill-card glass" key={skill.title}>
                <span className="index">0{i + 1}</span>
                <h3><LanguageText es={skill.title} en={en.home.skills[i].title} /></h3>
                <Tags>
                  {skill.items.map((item, itemIndex) => (
                    <Tag key={item}><LanguageText es={item} en={en.home.skills[i].items[itemIndex]} /></Tag>
                  ))}
                </Tags>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section id="experiencia" className="section-pad">
        <Container>
          <p className="eyebrow">
            <LanguageText es={es.home.experienceEyebrow} en={en.home.experienceEyebrow} />
          </p>
          <h2 className="section-heading">
            <LanguageText es={es.home.experienceTitle} en={en.home.experienceTitle} />
          </h2>
          <div className="timeline">
            {es.home.experience.map((item, index) => (
              <article className="timeline-item" key={`${item.role}-${item.company}`}>
                <span className="timeline-date"><LanguageText es={item.date} en={en.home.experience[index].date} /></span>
                <h3><LanguageText es={item.role} en={en.home.experience[index].role} /></h3>
                <h4>{item.company}</h4>
                <ul>
                  {item.points.map((point, pointIndex) => (
                    <li key={point}><LanguageText es={point} en={en.home.experience[index].points[pointIndex]} /></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="glass" style={{ borderRadius: 28, padding: "clamp(1.8rem,5vw,4rem)" }}>
            <p className="eyebrow">
              <LanguageText es={es.home.educationEyebrow} en={en.home.educationEyebrow} />
            </p>
            <h2 className="section-heading"><LanguageText es={es.home.educationTitle} en={en.home.educationTitle} /></h2>
            <p className="muted">
              <LanguageText es={es.home.education} en={en.home.education} />
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
