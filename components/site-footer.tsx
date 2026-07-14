import { Container } from "react-ui-vegetas-wife";

import Link from "next/link";

import { LanguageText } from "./language-text";
import en from "@/lang/en";
import es from "@/lang/es";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-row">
          <div>
            <strong>Wilman Hernández</strong>
            <br />
            <LanguageText es={es.footer.tagline} en={en.footer.tagline} />
          </div>
          <div>
            <Link href="mailto:wilman.h.h@gmail.com">
              <LanguageText es={es.footer.email} en={en.footer.email} />
            </Link>
            ·
            <a href="https://www.linkedin.com/in/wilmanhh" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <small>© {new Date().getFullYear()} Sirius Alpha</small>
        </div>
      </Container>
    </footer>
  );
}
