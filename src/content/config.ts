import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const metadataDefinition = () =>
  z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    ignoreTitleTemplate: z.boolean().optional(),
    canonical: z.string().url().optional(),
    robots: z.object({
      index: z.boolean().optional(),
      follow: z.boolean().optional(),
    }).optional(),
    description: z.string().optional(),
    openGraph: z.object({
      url: z.string().optional(),
      siteName: z.string().optional(),
      images: z.array(z.object({
        url: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      })).optional(),
      locale: z.string().optional(),
      type: z.string().optional(),
    }).optional(),
    twitter: z.object({
      handle: z.string().optional(),
      site: z.string().optional(),
      cardType: z.string().optional(),
    }).optional(),
  }).optional();

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    lastModified: z.string().optional(),
    image: z.string(),
    coverAlt: z.string().optional(),
    category: z.array(z.string()).optional(),
    tags: z.array(z.string()),
    author: z.string().optional(),
    metadata: metadataDefinition(),

  }),
});

const marketingCollection = defineCollection({
  schema: z.object({
    date: z.date().optional(),
    updateDate: z.date().optional(),
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    metadata: metadataDefinition(),
  }),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  blog,
  marketing: marketingCollection,
};
