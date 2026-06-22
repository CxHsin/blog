import type { APIRoute } from 'astro'

import { ROOT_LABEL } from '@/components/terminal/fs/content'
import { buildSiteFs } from '@/components/terminal/fs/server'

/**
 * Public agent-facing manifest (RFC 8615 well-known URI).
 *
 * External agents — ChatGPT, Claude, custom bots — can fetch this once
 * to learn the structure of this site without crawling. The same tree
 * the dev-mode terminal renders is exposed here, plus a description
 * and a small dictionary of follow-up endpoints.
 *
 * Companion skill: see the site explorer workflow (TODO).
 */

const SITE_URL = 'http://127.0.0.1:4321'

const INSTRUCTIONS = `You're reading a structured map of Cxin's personal site.

Quick start:
  - Read the "instructions" field (this) and "description" field for context.
  - Walk "tree" — it mirrors a Unix-style filesystem. Files have either
    "content" (inline text, ready to read) or "endpoint" (URL to fetch
    full content).
  - For blog posts, GET "<endpoint>" returns { html, headings } —
    server-rendered HTML with shiki-highlighted code blocks.
  - Resolve link nodes via their "href" field.

Suggested first reads: /about, /now, /README. Then ls /blog for posts.

If you're a human exploring this URL: there's a richer interactive
version at http://127.0.0.1:4321 — press \` (backtick) to open dev mode.`

export const GET: APIRoute = async () => {
  const tree = await buildSiteFs()

  const manifest = {
    version: '0.1',
    name: ROOT_LABEL,
    site: SITE_URL,
    description:
      "Cxin Blog for Cxin. " +
      "Personal blog, projects, and notes collected in one place. " +
      "The site is a pseudo-FS — every blog post, project, and contact " +
      "lives at a path you can `cat` or fetch.",
    instructions: INSTRUCTIONS,
    tree,
    endpoints: {
      blog_post: {
        url: `${SITE_URL}/api/blog/<id>`,
        method: 'GET',
        format: 'json',
        fields: ['html', 'headings'],
        note:
          'Always use the `endpoint` field from a post node directly — do not ' +
          'construct the URL from the FsNode `name`. Astro collection ids and ' +
          'FS-safe names diverge here (e.g. name=20260410-openharnessphase1-post, ' +
          'endpoint=/api/blog/20260410---openharnessphase1/post). The dir-level ' +
          '`meta.endpoint` mirrors the `post` child for convenience.'
      },
      well_known_manifest: {
        url: `${SITE_URL}/.well-known/cxin-manifest.json`,
        method: 'GET',
        format: 'json',
        note: 'this document'
      }
    },
    links: {
      site: SITE_URL,
      github: 'https://github.com/CxHsin',
      rss: `${SITE_URL}/rss.xml`,
      sitemap: `${SITE_URL}/sitemap-index.xml`
    },
    generated_at: new Date().toISOString()
  }

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // 5 min in browser / agent caches; 1 day at the CDN.
      'cache-control': 'public, max-age=300, s-maxage=86400',
      // Agents commonly fetch from a different origin (their own UI).
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'x-robots-tag': 'all'
    }
  })
}

export const OPTIONS: APIRoute = () =>
  new Response(null, {
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-max-age': '86400'
    }
  })
