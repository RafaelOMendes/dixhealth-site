import type { Metadata, Viewport } from "next";
import { Newsreader, Urbanist } from "next/font/google";

import "./globals.css";
import { LiquidNav } from "@/components/nav/LiquidNav";
import { SystemTheme, themeInitScript } from "@/components/theme/SystemTheme";
import { company } from "@/lib/content";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["300", "400"],
  display: "swap",
});

const description =
  "Cloud computing, HUB de Saúde e fábrica de software para o setor de saúde. Soluções sob medida, alinhadas às suas necessidades e expansões.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dixhealth.com.br"),
  title: {
    default: "DixHealth — Soluções em Saúde",
    template: "%s · DixHealth",
  },
  description,
  keywords: [
    "cloud computing",
    "saúde",
    "HUB de Saúde",
    "DixConnect",
    "fábrica de software",
    "AWS",
    "interoperabilidade",
    "Vila Velha",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: company.name,
    title: "DixHealth — Soluções em Saúde",
    description,
    images: [
      { url: "/brand/og.png", width: 1200, height: 630, alt: "DixHealth" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DixHealth — Soluções em Saúde",
    description,
    images: ["/brand/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efece6" },
    { media: "(prefers-color-scheme: dark)", color: "#090b0d" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${urbanist.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SystemTheme />
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-[color:var(--bg-2)] focus:px-4 focus:py-2 focus:ring-2 focus:ring-[#3aa0ea]"
        >
          Pular para o conteúdo
        </a>
        <LiquidNav />
        {children}
      </body>
    </html>
  );
}
