"use client";

import en from "@/lang/en";
import es from "@/lang/es";

export function LanguageToggle() {
  const toggleLanguage = () => {
    const next = document.documentElement.dataset.language === "en" ? "es" : "en";
    document.documentElement.dataset.language = next;
    document.documentElement.lang = next;
    localStorage.setItem("sirius-language", next);
  };
  return <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={`${es.navigation.changeLanguage} / ${en.navigation.changeLanguage}`} title={`${es.navigation.changeLanguage} / ${en.navigation.changeLanguage}`}><span className="language-current-es">EN</span><span className="language-current-en">ES</span></button>;
}
