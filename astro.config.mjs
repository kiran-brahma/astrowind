import keystatic from '@keystatic/astro';
import path from 'path';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import compress from 'astro-compress';
import pagefind from "astro-pagefind";
import keystatic from '@keystatic/astro'
import markdoc from '@astrojs/markdoc'


import { fileURLToPath } from 'url';
import react from '@astrojs/react';

import { defineConfig, passthroughImageService} from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';


import astrowind from './vendor/integration';

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
} from './src/utils/frontmatter.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  site: 'https://knighthood.co',
  output: 'static',
  adapter: vercel(
    {webAnalytics: {
      enabled: true,
    },
    
}),

  integrations: [react(),
    starlight({
      


      title: 'Knighthood Documentation',
      logo: {
				light: '/src/assets/favicons/logo.png',
				dark: '/src/assets/favicons/logo.png',
				replacesTitle: true,
			},
      sidebar: [
      
        {
      
          label: 'Employee Compliance',
          collapsed: true,
        items: [
          {
            label: "Introduction",
            link: 'docs/intro',
          },
          {label: 'Labour Compliance',
            autogenerate: { directory: 'docs/compliance' },
          },
          {label: 'Laws and Regulations',
            autogenerate: { directory: 'docs/employment' },
          },
          {label: 'Income Tax',
            autogenerate: { directory: 'docs/income-tax' },
          },
          {label: 'Payroll',
            autogenerate: { directory: 'docs/payroll' },
          },
          {label: 'Resources',
            autogenerate: { directory: 'docs/standard-resources' },
          },
        ]
            },
            {
              label: 'Security System',
              collapsed: true,
              items:
              [
                {label: 'Introduction',
                  link:'security/intro'
                },

                {label: 'Security Requirements',
                  autogenerate: { directory: 'security/requirements' },
                },
                {label: 'Security Planning',
                  autogenerate: { directory: 'security/planning' },
                },
                {label: 'Security Personnel',
                  autogenerate: { directory: 'security/personnel' },
                },
                {label: 'Security Measures',
                  autogenerate: { directory: 'security/measures' },
                },
                {label: 'Security Governance',
                  autogenerate: { directory: 'security/governance' },
                },
                {label: 'Business Continuity',
                  autogenerate: { directory: 'security/business_continuity' },
                },
                {label: 'Supply Chain Security',
                  autogenerate: { directory: 'security/supply_chain' },
                },
                {label: 'Classification System',
                  link:'security/classification'
                },
                {label: 'Event Security',
                  autogenerate: { directory: 'security/event-security' },
                },
                {label: 'Pre-Employment Verification',
                  autogenerate: { directory: 'security/verification' },
                },
                {label: 'Lifecycle Management',
                  link:'security/lifecycle'
                },
                {label: 'FAQ',
                  link:'security/faq'
                },

              ]
            }

        
  
  
  ]
    }),
  
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2025-02-13'),
    }),
    mdx(),
    pagefind(),
    icon({
      include: {
        tabler: ['*'],
        mdi:['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),

    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),

    astrowind({
      domains: [
        
        'i.imgur.com',
        'images.unsplash.com',
        'images.pexels.com',
      ],
      config: './src/config.yaml',
    }),
    
    ...(process.env.NODE_ENV === 'development' ? [] : []),
    markdoc(),keystatic(),
  ],

  image: {
    service: passthroughImageService(),
    remotePatterns: [{ protocol: "https" }],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
