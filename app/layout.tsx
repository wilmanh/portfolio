import type { Metadata } from "next";
import "react-ui-vegetas-wife/styles.css";
import "./themes.scss";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Wilman Hernández | Ingeniero Frontend", template: "%s | Wilman Hernández" },
  description: "Portfolio de Wilman Hernández, desarrollador Full-Stack y líder Frontend en Bogotá.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sirius-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;var l=localStorage.getItem('sirius-language');if(l!=='en'&&l!=='es')l='es';document.documentElement.dataset.language=l;document.documentElement.lang=l}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.dataset.language='es'}})()`,
          }}
        />
      </head>
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
