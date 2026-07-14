import type { Metadata } from "next";
import { Container } from "react-ui-vegetas-wife";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Wilman Hernández por correo, WhatsApp o LinkedIn.",
};
const contacts = [
  {
    icon: "✦",
    title: "Correo",
    value: "wilman.h.h@gmail.com",
    href: "mailto:wilman.h.h@gmail.com?subject=Hablemos%20de%20un%20proyecto",
  },
  {
    icon: "◉",
    title: "WhatsApp",
    value: "+57 316 784 9641",
    href: "https://wa.me/573167849641?text=Hola%20Wilman%2C%20vi%20tu%20portafolio%20y%20me%20gustaría%20conversar.",
  },
  { icon: "↗", title: "LinkedIn", value: "linkedin.com/in/wilmanhh", href: "https://www.linkedin.com/in/wilmanhh" },
  { icon: "⌖", title: "Ubicación", value: "Bogotá, Colombia", href: "https://maps.google.com/?q=Bogota,Colombia" },
];
export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">Conectemos</p>
          <h1 className="display-title gradient-text">Hagamos algo extraordinario.</h1>
          <p className="muted">¿Tienes una idea, un reto técnico o una oportunidad? Estoy a un mensaje de distancia.</p>
        </Container>
      </section>
      <section className="section-pad">
        <Container>
          <div className="contact-grid">
            {contacts.map((c) => (
              <a
                className="contact-card glass"
                href={c.href}
                key={c.title}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="contact-icon">{c.icon}</span>
                <span>
                  <small className="muted">{c.title}</small>
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
