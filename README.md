# Brut UI

Sistema de diseño brutalista-editorial con guiños de terminal/CLI. Construido para el portfolio de [Hever Rubio](https://heverrubiomarin.com).

**Live**: [heverrubiomarin.com/brut-ui](https://heverrubiomarin.com/brut-ui)

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind 3 (mismos tokens que portfolio-hever)
- Lucide React para íconos

## Dev

```bash
npm install
npm run dev        # arranca en http://localhost:5173/brut-ui/
npm run build      # genera dist/
npm run deploy:portfolio   # build + copy a ../portfolio-hever/public/brut-ui/
```

## Deploy

Este site se sirve como subpath estático del portfolio principal:

```
brut-ui/                          ← este repo
  └── dist/                       ← output de `npm run build`
       │
       ▼ copy
portfolio-hever/public/brut-ui/   ← se distribuye con el portfolio
       │
       ▼ zip → Hostinger
heverrubiomarin.com/brut-ui/
```

Un solo comando: `npm run deploy:portfolio` — builds + copia al portfolio. Luego desde portfolio-hever: `npm run build` y subes el zip.

## Estructura

```
src/
├── components/          # primitives reutilizables
│   ├── TopBar.tsx       # status bar mono sticky
│   ├── NavBar.tsx       # nav con anchor links
│   ├── SectionHeader.tsx
│   └── Copyable.tsx     # chip que copia al clipboard
├── sections/            # páginas/secciones del site
│   ├── Hero.tsx
│   ├── Pillars.tsx      # los 4 pilares del sistema
│   ├── Tokens.tsx       # color / typo / shadows / spacing
│   ├── Components.tsx   # live demos
│   ├── Voice.tsx        # reglas de copy + do/don't
│   ├── Principles.tsx   # no-goes + quick-ref para IA
│   └── Footer.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Los 4 pilares

1. **Brutalismo web** — estructura expuesta, bordes duros, sombras sólidas
2. **Swiss Style 50s** — grid, disciplina tipográfica, paleta mínima
3. **Terminal / CLI** — código como estética, paths, semáforos
4. **Editorial impreso** — drop caps, italic serif, pull-quotes

Más detalle en la sección `/#principles` del site.
