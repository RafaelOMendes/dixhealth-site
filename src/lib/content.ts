/**
 * Single source of truth for every string on the site.
 * Content mirrors dixhealth.com.br — edit here, not in the components.
 */

export const company = {
  name: "DixHealth",
  tagline: "Soluções em Saúde",
  cnpj: "39.336.761/0001-54",
  email: "relacionamento@dixhealth.com.br",
  whatsapp: "552734412622",
  whatsappLabel: "(27) 3441 2622",
  phones: ["(27) 3441 2622", "(51) 9 8598 0078", "(55) 9 9698 0112"],
  address: {
    line1: "Ed. Itaparica Top Business",
    line2: "Rod. do Sol, 2780 — Sala 908",
    line3: "Praia de Itaparica, Vila Velha — ES",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Rodovia+do+Sol+2780+Praia+de+Itaparica+Vila+Velha+ES",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/dixhealth/",
    instagram: "https://www.instagram.com/dixhealth/",
  },
} as const;

export const nav = [
  { id: "inicio", label: "Início", short: "Início" },
  { id: "pilares", label: "Pilares", short: "Pilares" },
  { id: "clientes", label: "Clientes", short: "Clientes" },
  { id: "essencia", label: "Quem somos", short: "Sobre" },
  { id: "contato", label: "Contato", short: "Contato" },
] as const;

export type NavItem = (typeof nav)[number];

export const hero = {
  eyebrow: "Tecnologia para a saúde",
  title: "Vamos escalar o seu negócio?",
  subtitle:
    "Desenvolvemos soluções sob medida, alinhadas às suas necessidades e expansões.",
  primaryCta: "Entre em contato",
  secondaryCta: "Conheça os pilares",
  plaque: "Aurora Clínica — gradiente sobre dados vitais, 2026",
  stats: [
    { value: "+200", label: "projetos de sucesso" },
    { value: "3", label: "pilares de atuação" },
    { value: "ES", label: "sede em Vila Velha" },
  ],
} as const;

export const pillars = [
  {
    id: "dixcloud",
    name: "DixCloud",
    lead: "Soluções em cloud",
    body: "sob medida com migração eficiente e expertise com os principais players do mercado, AWS, Tencent e Huawei, alinhadas às necessidades do seu negócio.",
    tags: ["AWS", "Tencent", "Huawei", "Migração", "Infraestrutura"],
    plaque: "Estratos — nuvem em curvas de nível",
    accent: "#3aa0ea",
  },
  {
    id: "dixhealth",
    name: "DixHealth",
    lead: "Soluções inovadoras",
    body: "como o HUB de Saúde, responsável por centralizar os dados de saúde, e o DixConnect, que integra múltiplas plataformas de comunicação, unindo tecnologia e expertise para otimizar resultados.",
    tags: ["HUB de Saúde", "DixConnect", "Interoperabilidade"],
    plaque: "Sístole — o dado como órgão",
    accent: "#3fd0a0",
  },
  {
    id: "dixdevelop",
    name: "DixDevelop",
    lead: "Fábrica de software",
    body: "especializada em saúde, com equipe multidisciplinar e expertise em tecnologias atuais. Inovação e qualidade para transformar o setor de saúde.",
    tags: ["Times multidisciplinares", "Produto", "Qualidade"],
    plaque: "Hélice — código em dupla fita",
    accent: "#44f17f",
  },
] as const;

export type Pillar = (typeof pillars)[number];

export const clients = {
  eyebrow: "Nossos clientes",
  headline: "+200 projetos de sucesso",
  sub: "Principais clientes",
  logos: [
    { file: "arcelor", name: "ArcelorMittal" },
    { file: "unimed", name: "Unimed" },
    { file: "valsa", name: "Valsa" },
    { file: "doc", name: "Clínica DOC" },
    { file: "mentalmap", name: "Mental Map" },
    { file: "qa", name: "QA IT" },
    { file: "integra", name: "Integra" },
    { file: "hemocord", name: "Hemocord" },
    { file: "hemolab", name: "Hemolab" },
    { file: "iax", name: "IAX Soluções" },
    { file: "simax", name: "Simax" },
    { file: "spa", name: "SPA Saúde" },
    { file: "agros", name: "Agros" },
    { file: "healthmap", name: "Healthmap" },
    { file: "vividus", name: "Vividus" },
  ],
} as const;

export const about = {
  eyebrow: "Quem somos",
  title: "Conheça nossa essência",
  paragraphs: [
    "Somos especialistas em cloud computing, infraestrutura, outsourcing de TI e desenvolvimento de sistemas.",
    "Entendemos o ambiente e os objetivos da sua empresa, encontrando as melhores soluções para impulsionar o seu negócio e dar segurança às operações tecnológicas.",
  ],
  plaque: "Prancha Anatômica nº 3 — a rede como corpo",
  cards: [
    {
      id: "missao",
      title: "Nossa missão",
      text: "Oferecer serviços de qualidade, segurança e transparência, atendendo necessidades com soluções que impulsionam eficiência, transformação digital e competitividade.",
      highlights: [
        "qualidade",
        "segurança",
        "transparência",
        "eficiência",
        "transformação digital e competitividade",
      ],
    },
    {
      id: "visao",
      title: "Nossa visão",
      text: "Ser a maior integradora nacional de soluções tecnológicas, líder em serviços excelentes e soluções inovadoras para as necessidades dos clientes.",
      highlights: [
        "integradora nacional de soluções tecnológicas",
        "excelentes",
        "inovadoras",
      ],
    },
    {
      id: "valores",
      title: "Nossos valores",
      list: [
        "Honestidade",
        "Responsabilidade",
        "Satisfação do cliente",
        "Conhecimento",
        "Competência",
      ],
    },
  ],
} as const;

export const contact = {
  eyebrow: "Contato",
  title: "Gostaria de saber mais?",
  sub: "Conte o seu cenário. Respondemos com um caminho — não com um catálogo.",
  consent:
    "Afirmo que li e concordo com a Política de Privacidade da DixHealth.",
  submit: "Enviar mensagem",
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${company.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
