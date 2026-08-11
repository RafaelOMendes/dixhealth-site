import { About } from "@/components/sections/About";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { company } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: "https://dixhealth.com.br",
  email: company.email,
  telephone: "+552734412622",
  sameAs: [company.social.linkedin, company.social.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rod. do Sol, 2780 — Sala 908, Ed. Itaparica Top Business",
    addressLocality: "Vila Velha",
    addressRegion: "ES",
    addressCountry: "BR",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <Clients />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
