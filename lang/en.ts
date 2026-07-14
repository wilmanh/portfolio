const en = {
  navigation: {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    menu: "Open menu",
    changeLanguage: "Change language",
  },
  footer: { tagline: "Building meaningful digital products.", email: "Email" },
  home: {
    eyebrow: "Full-Stack / Frontend Developer",
    titleStart: "Code that ",
    titleEnd: "moves ideas.",
    intro:
      "I’m Wilman Hernández. I design and build scalable, fast, maintainable web products, combining more than 10 years of engineering with technical leadership.",
    contactCta: "Let’s talk about your project →",
    experienceCta: "View experience",
    availability: "Available for new challenges",
    years: "Years",
    roles: "Roles",
    curiosity: "Curiosity",
    skillsEyebrow: "Stack and capabilities",
    skillsTitle: "Technology with purpose.",
    experienceEyebrow: "Experience",
    experienceTitle: "Experience that scales.",
    educationEyebrow: "Continuous learning",
    educationTitle: "Bachelor’s Degree in Computer Science",
    education:
      "Universidad de Oriente, Venezuela · Azure Fundamentals · Azure Data Fundamentals · DevOps Essentials · Scrum Foundation",
    skills: [
      { title: "Frontend Engineering", items: ["React", "TypeScript", "Next.js", "JavaScript", "Angular"] },
      { title: "Architecture and state", items: ["Design systems", "React Query", "Redux", "Zustand", "REST APIs"] },
      { title: "Backend and data", items: ["Node.js", "PostgreSQL", "MySQL", "SQLite", "PHP"] },
      { title: "Cloud and delivery", items: ["Azure", "AWS", "Google Cloud", "Docker", "CI/CD"] },
    ],
    experience: [
      {
        date: "Jan 2023 — May 2026",
        role: "Frontend Developer",
        company: "Lean Tech",
        points: [
          "Web application for logistics rate estimation.",
          "Migrations from Webpack to Vite and Jest to Vitest.",
          "CI/CD with Azure DevOps and Docker.",
        ],
      },
      {
        date: "Nov 2018 — Aug 2023",
        role: "Frontend Lead",
        company: "Everis",
        points: [
          "Led a three-person frontend team.",
          "Modernized React 15 to React 16 and migrated to TypeScript.",
          "Direct collaboration with oil-sector stakeholders.",
        ],
      },
      {
        date: "May 2017 — Oct 2018",
        role: "Full-Stack Developer",
        company: "Dreamjobs",
        points: [
          "Administrative platform built with Angular.",
          "Migrated Ionic v1 to v2.",
          "REST APIs with PHP, Yii2, and PostgreSQL.",
        ],
      },
      {
        date: "May 2015 — Mar 2017",
        role: "Systems Analyst",
        company: "Lagunamar Hotel",
        points: ["IT infrastructure, networks, security, monitoring, and support."],
      },
      {
        date: "Jan 2012 — Dec 2014",
        role: "IT Coordinator",
        company: "Musipan Theme Park",
        points: ["Managed IT operations, infrastructure, and support."],
      },
    ],
  },
  projects: {
    eyebrow: "Laboratory",
    description: "A space for products, experiments, and solutions worth sharing.",
    comingSoon: "Coming soon",
    empty: "The best projects are getting ready for launch.",
    cta: "Let’s build together",
  },
  blog: {
    eyebrow: "Field notes",
    title: "Ideas that compile.",
    description: "Frontend, architecture, leadership, and the decisions behind products that work.",
    read: "Read post →",
    emptyTitle: "The first idea is brewing.",
    empty: "This space will soon be full of lessons learned.",
    create: "Create post",
    minutes: "min",
  },
} as const;

export default en;
