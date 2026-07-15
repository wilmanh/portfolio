const es = {
  navigation: {
    home: "Inicio",
    projects: "Proyectos",
    blog: "Blog",
    contact: "Contacto",
    menu: "Abrir menú",
    changeLanguage: "Cambiar idioma",
  },
  footer: { tagline: "Construyendo productos digitales con propósito.", email: "Correo" },
  home: {
    eyebrow: "Desarrollador Full-Stack / Frontend",
    titleStart: "Código que ",
    titleEnd: "mueve ideas.",
    intro:
      "Soy Wilman Hernández. Diseño y construyo productos web escalables, rápidos y mantenibles, combinando más de 10 años de ingeniería con liderazgo técnico.",
    contactCta: "Hablemos de tu proyecto →",
    experienceCta: "Ver experiencia",
    availability: "Disponible para nuevos retos",
    years: "Años",
    roles: "Cargos",
    curiosity: "Curiosidad",
    skillsEyebrow: "Stack y capacidades",
    skillsTitle: "Tecnología con criterio.",
    experienceEyebrow: "Trayectoria",
    experienceTitle: "Experiencia que escala.",
    educationEyebrow: "Formación continua",
    educationTitle: "Licenciado en Informática",
    education:
      "Universidad de Oriente, Venezuela · Azure Fundamentals · Azure Data Fundamentals · DevOps Essentials · Scrum Foundation",
    skills: [
      { title: "Ingeniería Frontend", items: ["React", "TypeScript", "Next.js", "JavaScript", "Angular"] },
      { title: "Arquitectura y estado", items: ["Sistemas de diseño", "React Query", "Redux", "Zustand", "APIs REST"] },
      { title: "Backend y datos", items: ["Node.js", "PostgreSQL", "MySQL", "SQLite", "PHP"] },
      { title: "Nube y entrega", items: ["Azure", "AWS", "Google Cloud", "Docker", "CI/CD"] },
    ],
    experience: [
      {
        date: "Ene 2023 — May 2026",
        role: "Desarrollador Frontend",
        company: "Lean Tech",
        points: [
          "Aplicación web de estimación de tarifas logísticas.",
          "Migraciones de Webpack a Vite y Jest a Vitest.",
          "CI/CD con Azure DevOps y Docker.",
        ],
      },
      {
        date: "Nov 2018 — Ago 2023",
        role: "Líder Frontend",
        company: "Everis",
        points: [
          "Liderazgo de un equipo frontend de 3 personas.",
          "Modernización de React 15 a React 16 y migración a TypeScript.",
          "Colaboración directa con stakeholders del sector petrolero.",
        ],
      },
      {
        date: "May 2017 — Oct 2018",
        role: "Desarrollador Full-Stack",
        company: "Dreamjobs",
        points: [
          "Plataforma administrativa con Angular.",
          "Migración de Ionic v1 a v2.",
          "APIs REST con PHP, Yii2 y PostgreSQL.",
        ],
      },
      {
        date: "May 2015 — Mar 2017",
        role: "Analista de Sistemas",
        company: "Lagunamar Hotel",
        points: ["Infraestructura TI, redes, seguridad, monitoreo y soporte."],
      },
      {
        date: "Ene 2012 — Dic 2014",
        role: "Coordinador de TI",
        company: "Musipan Theme Park",
        points: ["Dirección de operaciones TI, infraestructura y soporte."],
      },
    ],
  },
  projects: {
    eyebrow: "Laboratorio",
    description: "Un espacio para productos, experimentos y soluciones que merecen ser compartidas.",
    vegeta: {
      title: "Vegeta's Wife",
      description: "Un wrapper de React para Bulma CSS con componentes reutilizables y documentación interactiva.",
      repository: "Ver repositorio",
      documentation: "Ver documentación",
    },
    portfolio: {
      title: "Portfolio de Wilman Hernández",
      description: "Este sitio personal, construido con Next.js, React y TypeScript para presentar experiencia, proyectos y notas técnicas.",
      repository: "Ver repositorio",
    },
    balloonRaider: {
      title: "Balloon Raider",
      description: "Un juego web de acción y aventura.",
      website: "Visitar sitio",
    },
  },
  blog: {
    eyebrow: "Notas de campo",
    title: "Ideas que compilan.",
    description: "Frontend, arquitectura, liderazgo y las decisiones detrás de productos que funcionan.",
    read: "Leer entrada →",
    emptyTitle: "La primera idea está cocinándose.",
    empty: "Este espacio estará lleno de aprendizajes muy pronto.",
    create: "Crear entrada",
    minutes: "min",
  },
  contact: {
    eyebrow: "Conectemos",
    title: "Hagamos algo extraordinario.",
    description: "¿Tienes una idea, un reto técnico o una oportunidad? Estoy a un mensaje de distancia.",
    email: "Correo",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    location: "Ubicación",
    locationValue: "Bogotá, Colombia",
  },
} as const;

export default es;
