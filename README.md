# DixHealth — site institucional

Reconstrução do site da DixHealth: conteúdo do site atual, identidade visual da
marca (azul `#3AA0EA` → verde `#44F17F`, tipografia Urbanist) e uma direção de
arte de galeria — cada seção traz uma "prancha" emoldurada, como os quadros de
um consultório.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Estilo | Tailwind CSS v4 |
| Animação | Motion (`motion/react`) |
| Deploy | Vercel (estático — não há backend) |

## Rodando localmente

```bash
npm install && npm run dev
```

Outros comandos: `npm run build`, `npm run start`, `npm run lint`.

## Deploy na Vercel

O projeto é um app Next.js padrão na raiz do repositório: importe na Vercel e
aceite os defaults (build `next build`, sem variáveis de ambiente). O site é
gerado 100% estático.

## Estrutura

```
src/
  app/                 layout, página, globals.css, robots, sitemap
  lib/
    content.ts         TODO o texto do site — edite aqui, não nos componentes
    glass.ts           estilos de backdrop-filter (ver nota abaixo)
  components/
    nav/LiquidNav      barra do topo que vira ilha flutuante; arraste para trocar
    glass/             filtro SVG de refração + detecção de suporte
    theme/             tema claro/escuro/sistema
    art/               Frame (moldura + plaquinha) e as pranchas em SVG
    sections/          Hero, Pilares, Clientes, Quem somos, Contato, Rodapé
public/
  clients/             logos dos clientes
  brand/               foto do escritório, imagem de Open Graph
```

## Detalhes que valem saber

**Navegação líquida.** No topo da página é uma barra; ao rolar, vira uma ilha
flutuante no rodapé da tela. O indicador acompanha o dedo/cursor: pressione e
arraste sobre as abas e ele troca conforme você passa por cima, esticando com a
velocidade e assentando na aba solta. Clique simples e teclado (setas,
Enter/Espaço) também funcionam.

**Refração: não tente de novo sem conseguir ver a tela.** Houve uma camada que
distorcia o fundo na borda com `feDisplacementMap` dentro de `backdrop-filter`.
No Chromium ela desenhava um artefato em forma de estrela sobre o menu, e foi
removida. Se for retomar, valide com captura de tela real antes de subir — o
efeito não dá para conferir só pelo DOM.

**`backdrop-filter` mora em `src/lib/glass.ts`, não no CSS.** O Lightning CSS,
que o Tailwind v4 usa para processar `globals.css`, remove essa propriedade das
folhas de estilo. Estilos inline passam intactos. Se for criar uma nova
superfície de vidro, use as classes `liquid liquid-rim` **e** `style={glassStyle}`.

**Camadas do CSS.** Regras base ficam em `@layer base` e as de componente em
`@layer components`. CSS sem camada vence qualquer utilitário do Tailwind — foi
assim que um `button { font: inherit }` solto anulou os `font-semibold` do menu.

**Tema.** Segue o sistema operacional, sem botão de troca. Um script bloqueante
em `layout.tsx` aplica o tema antes da primeira pintura (não há flash) e
`SystemTheme` mantém o atributo em dia se o SO mudar com a página aberta.

## Formulário de contato

Não há serviço de e-mail configurado. O formulário monta a mensagem e abre o
cliente de e-mail do visitante (`mailto:`), com WhatsApp como alternativa.

Para enviar pelo servidor, crie uma rota de API e troque o `handleSubmit` de
`src/components/sections/Contact.tsx` por um `fetch` — o restante do formulário
não muda.
