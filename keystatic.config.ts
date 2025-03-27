// keystatic.config.ts (Updated for public/img/ paths and slug-or-title logic)

import { config, fields, collection, singleton } from '@keystatic/core';

// Define the reusable metadata fields structure
const metadataFields = fields.object(
  {
    title: fields.text({
      label: 'Meta Title',
      description: 'Custom title for SEO and social sharing (overrides main title).',
    }),
    image: fields.image({
      label: 'Meta Image',
      description: 'Custom image for social sharing (e.g., open graph).',
      // Filing Location for meta images
      directory: 'public/img/metadata/', // <-- UPDATED
      // Street Address for meta images
      publicPath: '/img/metadata/', // <-- UPDATED
    }),
    ignoreTitleTemplate: fields.checkbox({
      label: 'Ignore Site Title Template',
      description: 'Use the meta title exactly as entered, without site name suffix.',
    }),
    canonical: fields.url({
      label: 'Canonical URL',
      description: 'The preferred URL for this content, if different from the page URL.',
      validation: { isRequired: false },
    }),
    robots: fields.object({
        index: fields.checkbox({ label: 'Allow Indexing (index)', defaultValue: true }),
        follow: fields.checkbox({ label: 'Allow Following Links (follow)', defaultValue: true }),
      }, {
      label: 'Search Engine Robots',
      description: 'Instructions for search engine crawlers.',
    }),
    description: fields.text({
      label: 'Meta Description',
      multiline: true,
      description: 'Short description for SEO and social sharing.',
    }),
    openGraph: fields.object({
        url: fields.url({ label: 'Open Graph URL' }),
        siteName: fields.text({ label: 'Open Graph Site Name' }),
        images: fields.array(
          fields.object({
            url: fields.url({ label: 'Image URL', validation: { isRequired: true } }),
            // width: fields.integer({ label: 'Width' }),
            // height: fields.integer({ label: 'Height' }),
          }), {
          label: 'Open Graph Images',
          itemLabel: (props) => props.fields.url.value || 'New Image',
        }),
        locale: fields.text({ label: 'Open Graph Locale (e.g., en_US)' }),
        type: fields.text({ label: 'Open Graph Type (e.g., article)' }),
      }, {
      label: 'Open Graph Protocol',
      description: 'Settings for Facebook, LinkedIn, etc.'
    }),
    twitter: fields.object({
        handle: fields.text({ label: 'Twitter Handle (e.g., @username)' }),
        site: fields.text({ label: 'Twitter Site (e.g., @username)' }),
        cardType: fields.text({ label: 'Twitter Card Type (e.g., summary_large_image)' }),
      }, {
      label: 'Twitter Card',
      description: 'Settings for Twitter sharing.'
    }),
  },
  {
    label: 'Metadata / SEO',
    description: 'Optional settings for search engines and social media.',
  }
);

// Helper function to create the slug field configuration consistently
const createSlugField = () => fields.slug({
    name: {
        label: 'Slug (URL Path)',
        description: 'The unique identifier used in the URL. Auto-generated from title if left blank.',
        validation: { isRequired: true }
    },
    basedOn: 'title',
});


export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'blog/astrowind',
  },

  ui: {
    brand: { name: 'Your Project Name' }, // Replace with your actual project name
  },

  collections: {
    // === Blog Collection (UPDATED paths) ===
    blog: collection({
      label: 'Blog Posts',
      path: 'src/content/blog/*',
      slugField: 'slug',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        slug: createSlugField(),
        date: fields.date({ label: 'Publication Date', validation: { isRequired: true } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { isRequired: true } }),
        lastModified: fields.date({ label: 'Last Modified Date' }),
        image: fields.image({ // Cover Image
          label: 'Cover Image',
          validation: { isRequired: true },
          directory: 'public/img/blog/covers/', // <-- UPDATED
          publicPath: '/img/blog/covers/', // <-- UPDATED
        }),
        coverAlt: fields.text({ label: 'Cover Image Alt Text' }),
        category: fields.array( fields.text({ label: 'Category Name' }), { label: 'Categories', itemLabel: props => props.value } ),
        tags: fields.array( fields.text({ label: 'Tag Name' }), { label: 'Tags', itemLabel: props => props.value, validation: { isRequired: true } } ),
        author: fields.text({ label: 'Author' }),
        metadata: metadataFields,
        content: fields.document({
          label: 'Post Content',
          formatting: true, dividers: true, links: true, tables: true,
          images: { // Images within the document body
            directory: 'public/', // <-- UPDATED
            publicPath: '/', // <-- UPDATED
          },
        }),
      },
    }),

    // === Update Collection (UPDATED paths) ===
    update: collection({
      label: 'Updates',
      path: 'src/content/update/*',
      slugField: 'slug',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        slug: createSlugField(),
        date: fields.date({ label: 'Publication Date', validation: { isRequired: true } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { isRequired: true } }),
        lastModified: fields.date({ label: 'Last Modified Date' }),
        image: fields.image({ // Cover Image
          label: 'Cover Image',
          validation: { isRequired: true },
          directory: 'public/img/updates/covers/', // <-- UPDATED
          publicPath: '/img/updates/covers/', // <-- UPDATED
        }),
        coverAlt: fields.text({ label: 'Cover Image Alt Text' }),
        category: fields.array( fields.text({ label: 'Category Name' }), { label: 'Categories', itemLabel: props => props.value } ),
        tags: fields.array( fields.text({ label: 'Tag Name' }), { label: 'Tags', itemLabel: props => props.value } ),
        author: fields.text({ label: 'Author' }),
        metadata: metadataFields,
        content: fields.document({
          label: 'Update Content',
          formatting: true, dividers: true, links: true, tables: true,
          images: { // Images within the document body
            directory: 'public/img/', // <-- UPDATED
            publicPath: '/img/', // <-- UPDATED
          },
        }),
      },
    }),

    // === Marketing Collection (UPDATED paths) ===
    marketing: collection({
      label: 'Marketing Pages',
      path: 'src/content/marketing/*',
      slugField: 'slug',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        slug: createSlugField(),
        date: fields.date({ label: 'Publication Date' }),
        updateDate: fields.date({ label: 'Last Update Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        image: fields.image({ // Header Image
          label: 'Header Image',
          directory: 'public/img/', // <-- UPDATED
          publicPath: '/img/', // <-- UPDATED
        }),
        metadata: metadataFields,
        content: fields.document({
          label: 'Page Content',
          formatting: true, dividers: true, links: true, tables: true,
          images: { // Images within the document body
            directory: 'public/img/', // <-- UPDATED
            publicPath: '/img/', // <-- UPDATED
          },
        }),
      },
    }),

    // === Docs Collection (UPDATED paths) ===
    docs: collection({
      label: 'Documentation',
      path: 'src/content/docs/**/*.md',
      slugField: 'slug',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title', validation: { isRequired: true } }),
        slug: createSlugField(),
        description: fields.text({ label: 'Page Description', multiline: true }),
        sidebar: fields.object({
            label: fields.text({ label: 'Sidebar Label'}),
            order: fields.integer({ label: 'Sidebar Order'}),
          }, {
           label: 'Sidebar Configuration'
        }),
        content: fields.document({
          label: 'Documentation Content',
          formatting: true, dividers: true, links: true, tables: true, codeBlocks: true,
          images: { // Images within the document body
            directory: 'public/img/', // <-- UPDATED
            publicPath: '/img/', // <-- UPDATED
          },
        }),
      },
    }),
  },
});
