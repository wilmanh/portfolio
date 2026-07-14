import type { Metadata } from "next";
import { Container } from "react-ui-vegetas-wife";

import { LanguageText } from "@/components/language-text";
import en from "@/lang/en";
import es from "@/lang/es";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Wilman Hernández por correo, WhatsApp o LinkedIn.",
};
const contacts = [
  {
    icon: "✦",
    esTitle: es.contact.email,
    enTitle: en.contact.email,
    value: "wilman.h.h@gmail.com",
    href: "mailto:wilman.h.h@gmail.com?subject=Hablemos%20de%20un%20proyecto",
  },
  {
    icon: "◉",
    esTitle: es.contact.whatsapp,
    enTitle: en.contact.whatsapp,
    value: "+57 316 784 9641",
    href: "https://wa.me/573167849641?text=Hola%20Wilman%2C%20vi%20tu%20portafolio%20y%20me%20gustaría%20conversar.",
  },
  { icon: "↗", esTitle: es.contact.linkedin, enTitle: en.contact.linkedin, value: "linkedin.com/in/wilmanhh", href: "https://www.linkedin.com/in/wilmanhh" },
  { icon: "⌖", esTitle: es.contact.location, enTitle: en.contact.location, value: es.contact.locationValue, href: "https://maps.google.com/?q=Bogota,Colombia" },
];
export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow"><LanguageText es={es.contact.eyebrow} en={en.contact.eyebrow} /></p>
          <h1 className="display-title gradient-text"><LanguageText es={es.contact.title} en={en.contact.title} /></h1>
          <p className="muted"><LanguageText es={es.contact.description} en={en.contact.description} /></p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="contact-grid">
            {contacts.map((c) => (
              <a
                className="contact-card glass"
                href={c.href}
                key={c.esTitle}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="contact-icon">{c.icon}</span>
                <span>
                  <small className="muted"><LanguageText es={c.esTitle} en={c.enTitle} /></small>
                  <strong style={{ display: "block" }}>{c.value}</strong>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
