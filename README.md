# Cxin Blog

Personal blog built with Astro Theme Pure.

## About

- Owner: `CxHsin`
- GitHub: [CxHsin](https://github.com/CxHsin)
- Repository: [CxHsin/blog](https://github.com/CxHsin/blog)

This repository powers a personal blog for posts, project pages, archived notes, and search.
It is adapted from [joyehuang/blog](https://github.com/joyehuang/blog) with project-specific customizations.

## Tech Stack

- Astro
- React
- TypeScript
- Bun
- Vercel

## Local Development

Requirements:

- Node.js 18+
- Bun 1.3+

Clone the repository:

```bash
git clone https://github.com/CxHsin/blog.git
cd blog
```

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun run dev
```

Common commands:

```bash
bun run build
bun run preview
bun run check
bun run lint
bun run format
```

## Deploy

This project is configured for Vercel via `@astrojs/vercel`.

Before deploying, make sure:

- `site` in `astro.config.ts` is set to your production domain
- `GITHUB_TOKEN` is configured in Vercel environment variables

## Notes

- The repository includes site content and assets that are part of the published blog
- If you continue the rebrand, it is worth reviewing site copy and post content for leftover legacy identity references

## License

Apache 2.0
