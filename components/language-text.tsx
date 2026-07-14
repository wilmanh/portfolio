export function LanguageText({ es, en }: { es: string; en: string }) {
  return (
    <>
      <span className="language-es">{es}</span>
      <span className="language-en">{en}</span>
    </>
  );
}
