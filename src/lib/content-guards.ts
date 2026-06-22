import type { CollectionEntry } from 'astro:content'
import { getCollection, getEntry } from 'astro:content'
import { getBlogCollection } from 'astro-pure/server'
import { readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const blogDir = fileURLToPath(new URL('../content/blog', import.meta.url))
const archiveDir = fileURLToPath(new URL('../content/archive', import.meta.url))

const contentPresence = new Map<string, Promise<boolean>>()

async function hasMarkdownFiles(dir: string): Promise<boolean> {
  const cached = contentPresence.get(dir)
  if (cached) return cached

  const pending = (async () => {
    try {
      const entries = await readdir(dir, { withFileTypes: true, recursive: true })
      return entries.some((entry) => entry.isFile() && /\.(md|mdx)$/i.test(entry.name))
    } catch {
      return false
    }
  })()

  contentPresence.set(dir, pending)
  return pending
}

export async function getSafeBlogCollection(): Promise<CollectionEntry<'blog'>[]> {
  if (!(await hasMarkdownFiles(blogDir))) return []
  return (await getBlogCollection()) as CollectionEntry<'blog'>[]
}

export async function getSafeArchiveCollection(): Promise<CollectionEntry<'archive'>[]> {
  if (!(await hasMarkdownFiles(archiveDir))) return []
  return await getCollection('archive')
}

export async function getSafeBlogEntry(id: string) {
  if (!(await hasMarkdownFiles(blogDir))) return undefined
  return getEntry('blog', id)
}
