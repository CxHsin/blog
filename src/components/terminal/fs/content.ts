/**
 * Static text content for the pseudo-FS. Inlined directly into the
 * manifest (small, ships once with the page). Long-form content like
 * blog posts is fetched lazily through `endpoint`.
 */

/**
 * Hostname-style label for the FS root. Surfaced in the prompt host
 * segment and as the prefix of `pwd` output (so the tree visibly
 * "lives" on this machine). Change here, propagates everywhere.
 */
export const ROOT_LABEL = 'cxin.devserver'

export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: 'github', href: 'https://github.com/CxHsin' },
  { label: 'mail', href: 'mailto:cxin@example.com' }
]

export const README_TEXT = `cxin.devserver - a pseudo-FS over my published content.

If you're an AI agent the easy path is the public manifest:
  GET /.well-known/cxin-manifest.json
That returns the same tree you see here, plus instructions and the
endpoint dictionary. CORS is open.

If you're poking around in dev mode:
  ls               — see what's here
  search agent     — search posts and notes
  cat about        — short bio
  cat now          — what I'm working on
  cd /blog         — recent posts (each has meta / summary / post)
  cat /blog/<slug>/post  — inline read with shiki highlighting
  manifest         — same data as the well-known URL, in this terminal
`

export const ABOUT_TEXT = `Cxin
GitHub: https://github.com/CxHsin

This is Cxin Blog: a personal site for notes, projects, and experiments.
The public GitHub profile is the source of truth for code and activity.
`

export const NOW_TEXT = `Now:

- setting up Cxin Blog
- wiring the site to my GitHub profile and avatar
- keeping terminal mode useful for quick navigation
`

export const PERSONALITY_TEXT = `# personality.conf
# referenced by the boot sequence — flavor only

style:     terminal-native
voice:     calm, direct
languages: zh-CN, ts, py
location:  GitHub first, everything else later
`

export const MOTD_TEXT = `Welcome to Cxin Blog dev mode.

This is a pseudo-FS exposing my site's content as a directory tree.
Type \`help\` for commands. \`exit\` or Esc to leave.
`
