"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "react-feather";
import { Button, Icon } from "react-ui-vegetas-wife";

import en from "@/lang/en";
import es from "@/lang/es";

export function LanguageToggle() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const selectLanguage = (next: "es" | "en") => {
    document.documentElement.dataset.language = next;
    document.documentElement.lang = next;
    localStorage.setItem("sirius-language", next);
    setLanguage(next);
    setOpen(false);
  };

  return (
    <div className="language-menu" ref={menuRef}>
      <Button
        rounded
        type="button"
        className="theme-toggle"
        onClick={() => {
          setLanguage(document.documentElement.dataset.language === "en" ? "en" : "es");
          setOpen((current) => !current);
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`${es.navigation.changeLanguage} / ${en.navigation.changeLanguage}`}
        title={`${es.navigation.changeLanguage} / ${en.navigation.changeLanguage}`}
      >
        <Icon>
          <Globe size={20} aria-hidden="true" />
        </Icon>
      </Button>
      {open && (
        <div
          className="language-options"
          role="menu"
          aria-label={`${es.navigation.changeLanguage} / ${en.navigation.changeLanguage}`}
        >
          <Button
            type="button"
            role="menuitemradio"
            aria-checked={language === "es"}
            onClick={() => selectLanguage("es")}
          >
            Español {language === "es" && <Check size={15} aria-hidden="true" />}
          </Button>
          <Button
            type="button"
            role="menuitemradio"
            aria-checked={language === "en"}
            onClick={() => selectLanguage("en")}
          >
            English {language === "en" && <Check size={15} aria-hidden="true" />}
          </Button>
        </div>
      )}
    </div>
  );
}
