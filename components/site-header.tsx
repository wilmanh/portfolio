"use client";

import { useState } from "react";
import { BookOpen, Briefcase, Home, Lock, Mail } from "react-feather";
import { Navbar, NavbarBrand, NavbarBurger, NavbarEnd, NavbarMenu, NavbarStart } from "react-ui-vegetas-wife";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageToggle } from "@/components/language-toggle";
import en from "@/lang/en";
import es from "@/lang/es";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", es: es.navigation.home, en: en.navigation.home, icon: Home },
  { href: "/proyectos", es: es.navigation.projects, en: en.navigation.projects, icon: Briefcase },
  { href: "/blog", es: es.navigation.blog, en: en.navigation.blog, icon: BookOpen },
  { href: "/contacto", es: es.navigation.contact, en: en.navigation.contact, icon: Mail },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    // <header>
    <header
    // className="nav-shell"
    >
      <Navbar className="is-fixed-top" aria-label="Navegación principal">
        <NavbarBrand>
          <Link className="navbar-item" href="/" onClick={() => setOpen(false)}>
            <figure className="image is-64x64">
              <Image
                className="is-rounded"
                src="/sirius-alpha-logo.png"
                alt="Logo Sirius Alpha"
                width={64}
                height={64}
                priority
              />
            </figure>
            <span>Sirius Alpha</span>
          </Link>
          <NavbarBurger active={open} onClick={() => setOpen(!open)} aria-label="Abrir menú" />
        </NavbarBrand>
        <NavbarMenu active={open}>
          <NavbarStart>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`navbar-item ${pathname === link.href ? "is-active" : ""}`}
              >
                <link.icon size={17} aria-hidden="true" />
                <span className="language-es">{link.es}</span>
                <span className="language-en">{link.en}</span>
              </Link>
            ))}
          </NavbarStart>
          <NavbarEnd>
            <Link href="/blog/admin" className="navbar-item nav-login">
              <Lock size={16} aria-hidden="true" />
            </Link>
            <div className="navbar-item theme-toggle-item">
              <ThemeToggle />
            </div>
            <div className="navbar-item theme-toggle-item">
              <LanguageToggle />
            </div>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
