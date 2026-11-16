// ---------------------------------------------------------------------------
// Content model. Every page under Projects, Docs and Apps is generated from
// the Markdown files in src/content/. Add a file to add a page; delete it to
// remove the page. The schemas below check each file's front matter at build
// time, so a typo fails the build instead of publishing a broken page.
// ---------------------------------------------------------------------------
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const md = '**/[^_]*.md'; // files starting with _ are ignored

/** A grouping of related projects, e.g. "Vulkan for Delphi". */
const groups = defineCollection({
  loader: glob({ pattern: md, base: './src/content/groups' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(100),
    tech: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/** One GitHub repository / product. */
const projects = defineCollection({
  loader: glob({ pattern: md, base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    group: reference('groups'),
    summary: z.string(),
    // public: shows the GitHub link. private: never links to the repo.
    visibility: z.enum(['public', 'private']),
    repo: z.string().url().optional(),
    license: z.string().optional(),
    // wip = work in progress: shown with a WIP badge and a notice on the page.
    status: z.enum(['active', 'wip', 'beta', 'maintenance', 'archived']).default('active'),
    tech: z.array(z.string()).default([]),
    // Search phrases for this project, used in its structured data.
    keywords: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    // External libraries, standards and related projects, listed in the page's sidebar.
    references: z
      .array(z.object({ label: z.string(), url: z.string(), note: z.string().optional() }))
      .default([]),
    // Call to action for private/commercial projects.
    enquire: z.string().optional(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

/** Documentation pages, filed by project: src/content/docs/<project>/<page>.md */
const docs = defineCollection({
  loader: glob({ pattern: md, base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    project: reference('projects'),
    description: z.string().optional(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

/** Store apps. Each one gets a page, a support page and a privacy page. */
const apps = defineCollection({
  loader: glob({ pattern: md, base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    project: reference('projects').optional(),
    platforms: z.array(z.enum(['iOS', 'iPadOS', 'macOS', 'Android', 'Windows'])).default([]),
    // schema.org category, e.g. UtilitiesApplication, BusinessApplication,
    // DesignApplication, EducationalApplication, DeveloperApplication.
    category: z.string().default('UtilitiesApplication'),
    appStoreUrl: z.string().url().optional(),
    playStoreUrl: z.string().url().optional(),
    otherDownloads: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    supportEmail: z.string().email().optional(),
    minOs: z.string().optional(),
    privacy: z
      .object({
        updated: z.coerce.date(),
        collectsData: z.boolean().default(false),
        data: z
          .array(
            z.object({
              category: z.string(),
              purpose: z.string(),
              linkedToUser: z.boolean().default(false),
              shared: z.boolean().default(false),
              optional: z.boolean().default(false),
            }),
          )
          .default([]),
        thirdParties: z
          .array(z.object({ name: z.string(), purpose: z.string(), policyUrl: z.string().url() }))
          .default([]),
        // Google Play needs a deletion page if the app has user accounts.
        accounts: z.boolean().default(false),
        retention: z.string().optional(),
      })
      .default({ updated: new Date('2026-11-16') }),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { groups, projects, docs, apps };
