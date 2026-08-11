"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal } from "@/components/ui/Reveal";
import { company, contact, waLink } from "@/lib/content";
import { glassStyle } from "@/lib/glass";

const field =
  "w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--bg-2)]/70 px-4 py-3 text-[0.95rem] placeholder:text-[color:var(--ink-3)] transition-colors focus:border-transparent";

/**
 * No mail transport is configured, so the form hands the message to whatever
 * the visitor already uses. Swap `handleSubmit` for a POST to an API route the
 * day a provider (Resend, SES…) is wired up — the markup stays as is.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const email = String(data.get("email") ?? "");
    const assunto = String(data.get("assunto") ?? "");
    const mensagem = String(data.get("mensagem") ?? "");

    const body = `${mensagem}\n\n—\n${nome}\n${email}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      assunto || `Contato pelo site — ${nome}`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <section
      id="contato"
      className="relative scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1fr] lg:gap-16">
          {/* ------------------------------------------------ left rail */}
          <div>
            <Reveal>
              <p className="eyebrow">{contact.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance">
                {contact.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">
                {contact.sub}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={waLink(
                    "Olá! Vim pelo site da DixHealth e gostaria de conversar.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9375rem] font-semibold text-[#06231a] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  <IconWhatsapp /> WhatsApp
                </a>
                <a
                  href={`mailto:${company.email}`}
                  style={glassStyle}
                  className="liquid liquid-rim inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.9375rem] font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  <IconMail /> E-mail
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 space-y-6 border-t border-[color:var(--line)] pt-8 text-[0.9375rem]">
                <div>
                  <dt className="eyebrow mb-2.5">Telefones</dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-1.5">
                    {company.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:+${p.replace(/\D/g, "")}`}
                        className="tabular-nums text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
                      >
                        {p}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">E-mail</dt>
                  <dd>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2.5">Faça-nos uma visita</dt>
                  <dd>
                    <a
                      href={company.address.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-relaxed text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
                    >
                      {company.address.line1}
                      <br />
                      {company.address.line2}
                      <br />
                      {company.address.line3}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* ---------------------------------------------------- form */}
          <Reveal delay={0.1}>
            <div
              style={glassStyle}
              className="liquid liquid-rim relative overflow-hidden rounded-[26px] p-6 sm:p-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                  >
                    <span className="brand-gradient grid h-12 w-12 place-items-center rounded-full text-[#06231a]">
                      <IconCheck />
                    </span>
                    <h3 className="mt-6 text-2xl font-extrabold tracking-tight">
                      Quase lá.
                    </h3>
                    <p className="mt-3 max-w-[38ch] leading-relaxed text-[color:var(--ink-2)]">
                      Abrimos seu aplicativo de e-mail com a mensagem pronta. Se
                      nada aconteceu, escreva direto para{" "}
                      <a
                        className="brand-text font-semibold"
                        href={`mailto:${company.email}`}
                      >
                        {company.email}
                      </a>{" "}
                      ou fale no WhatsApp.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-7 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors hover:border-[color:var(--line-strong)]"
                    >
                      Escrever outra mensagem
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow mb-2 block">Nome</span>
                        <input
                          name="nome"
                          required
                          autoComplete="name"
                          placeholder="Como podemos te chamar"
                          className={field}
                        />
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-2 block">E-mail</span>
                        <input
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="voce@empresa.com.br"
                          className={field}
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="eyebrow mb-2 block">Assunto</span>
                      <input
                        name="assunto"
                        placeholder="Migração para cloud, HUB de Saúde…"
                        className={field}
                      />
                    </label>

                    <label className="block">
                      <span className="eyebrow mb-2 block">Mensagem</span>
                      <textarea
                        name="mensagem"
                        required
                        rows={6}
                        placeholder="Descreva o cenário e o que precisa acontecer."
                        className={`${field} resize-y`}
                      />
                    </label>

                    <label className="flex cursor-pointer items-start gap-3 pt-1 text-[0.875rem] leading-relaxed text-[color:var(--ink-2)]">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#3aa0ea]"
                      />
                      <span>{contact.consent}</span>
                    </label>

                    <button
                      type="submit"
                      className="brand-gradient mt-2 w-full rounded-full px-6 py-3.5 text-[0.9375rem] font-semibold text-[#06231a] shadow-[0_10px_30px_-12px_rgb(58_160_234/0.8)] transition-transform duration-200 hover:scale-[1.015] active:scale-[0.99]"
                    >
                      {contact.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- icons */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconWhatsapp() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.24.69-1.42 1.32-1.96 1.37-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.19-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.59.83 2.02.9 2.17.07.14.12.31.02.5-.1.19-.15.31-.29.48l-.44.51c-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.28 2.3 1.42.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.19-.29.39-.24.65-.14.27.09 1.69.8 1.98.94.29.15.48.22.55.34.07.12.07.69-.17 1.38Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...stroke}>
      <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.6" />
      <path d="m3.4 7.2 8.6 5.8 8.6-5.8" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} strokeWidth={2.4}>
      <path d="m5 12.6 4.6 4.4L19 6.8" />
    </svg>
  );
}
