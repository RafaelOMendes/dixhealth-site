import { Logotype } from "@/components/brand/Wordmark";
import { company, nav } from "@/lib/content";

const social = [
  {
    href: company.social.linkedin,
    label: "LinkedIn",
    path: "M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76v5.69h-4v-5.05c0-1.2-.02-2.75-1.75-2.75s-2.02 1.31-2.02 2.66v5.14h-4v-11Z",
  },
  {
    href: company.social.instagram,
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm0 11.13a4.38 4.38 0 1 1 0-8.76 4.38 4.38 0 0 1 0 8.76Zm8.6-11.4a1.58 1.58 0 1 1-3.15 0 1.58 1.58 0 0 1 3.15 0Z",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-5 pt-16 pb-36 sm:px-8 lg:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px sm:inset-x-8"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--line-strong), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logotype />
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-[color:var(--ink-2)]">
              {company.tagline}. Cloud, dados e software para quem cuida de
              gente.
            </p>
            <p className="mt-5 text-[0.8125rem] text-[color:var(--ink-3)]">
              CNPJ: {company.cnpj}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <p className="eyebrow mb-4">Navegue</p>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Onde estamos</p>
            <a
              href={company.address.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[0.9375rem] leading-relaxed text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
            >
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.line3}
            </a>

            <div className="mt-6 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] text-[color:var(--ink-2)] transition-all duration-200 hover:scale-105 hover:border-[color:var(--line-strong)] hover:text-[color:var(--ink)]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                aria-label="E-mail"
                className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] text-[color:var(--ink-2)] transition-all duration-200 hover:scale-105 hover:border-[color:var(--line-strong)] hover:text-[color:var(--ink)]"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.6" />
                  <path d="m3.4 7.2 8.6 5.8 8.6-5.8" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-[color:var(--line)] pt-7 text-[0.8125rem] text-[color:var(--ink-3)]">
          © {year} {company.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
