import { defineCollection, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z
      .object({
        src: image(),
        alt: z.string().optional(),
        inferSize: z.boolean().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        color: z.string().optional()
      })
      .optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    language: z.string().optional(),
    translationKey: z.string().optional(),
    draft: z.boolean().default(false),
    comment: z.boolean().default(true)
  })

const archiveSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
  type: z.enum(['note', 'snippet', 'draft', 'idea', 'research', 'reference']).default('note'),
  status: z.enum(['in-progress', 'incomplete', 'ready', 'archived']).default('in-progress'),
  draft: z.boolean().default(false),
  language: z.string().optional(),
  translationKey: z.string().optional(),
  relatedBlog: z.array(z.string()).optional(),
  relatedArchive: z.array(z.string()).optional(),
  source: z.string().url().optional()
})

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

const archive = defineCollection({
  loader: glob({ base: './src/content/archive', pattern: '**/*.{md,mdx}' }),
  schema: archiveSchema
})

const curated = defineCollection({
  loader: glob({ base: './src/content/curated', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      source: z.string().url(),
      sourceTitle: z.string().optional(),
      sourceAuthor: z.string().optional(),
      why: z.string().max(180).optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      type: z.enum(['paper', 'blog', 'article', 'report', 'repo']).default('blog'),
      status: z.enum(['curated', 'digested']).default('curated'),
      difficulty: z.enum(['intro', 'intermediate', 'deep']).optional(),
      relatedBlog: z.array(z.string()).optional(),
      relatedArchive: z.array(z.string()).optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional()
        })
        .optional(),
      draft: z.boolean().default(false)
    })
})

export const collections = { blog, archive, curated }
