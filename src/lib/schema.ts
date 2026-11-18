// ---------------------------------------------------------------------------
// Structured data (schema.org JSON-LD). Search engines read it to understand
// that Datavis is an organisation, which pages are software, apps and docs,
// and where each page sits in the site. It is not shown on the page.
// Test a published page at https://search.google.com/test/rich-results
// ---------------------------------------------------------------------------
import type { CollectionEntry } from 'astro:content';
import { site } from '../site.config';

const abs = (path: string) => new URL(path, site.url).href;
export const ORG_ID = abs('/#organization');
const SITE_ID = abs('/#website');

export type Node = Record<string, unknown>;

/** Who publishes the site. Added to every page. */
export function organization(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/images/logo-light.png'), width: 640, height: 154 },
    email: site.email.general,
    ...(site.abn ? { taxID: `ABN ${site.abn}` } : {}),
    address: { '@type': 'PostalAddress', addressCountry: 'AU' },
    sameAs: [site.github.url],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: site.email.support,
        url: abs('/support/'),
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email.sales,
        url: abs('/contact/'),
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'billing support',
        email: site.email.accounts,
        url: abs('/contact/'),
        availableLanguage: 'English',
      },
    ],
  };
}

/** The site itself. Added to every page. */
export function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.legalName,
    url: abs('/'),
    description: site.description,
    inLanguage: 'en-AU',
    publisher: { '@id': ORG_ID },
  };
}

/** "Projects > Vulkan for Delphi > Vulkan_Package" trail shown in search results. */
export function breadcrumbs(items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** A project page: open source code, or a commercial software product. */
export function project(p: CollectionEntry<'projects'>, path: string): Node {
  const common = {
    '@id': abs(`${path}#software`),
    name: p.data.title,
    description: p.data.summary,
    url: abs(path),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(p.data.keywords.length ? { keywords: p.data.keywords.join(', ') } : {}),
  };
  if (p.data.visibility === 'public') {
    return {
      '@type': 'SoftwareSourceCode',
      ...common,
      ...(p.data.repo ? { codeRepository: p.data.repo } : {}),
      ...(p.data.license ? { license: p.data.license } : {}),
      programmingLanguage: p.data.tech.includes('delphi') || p.data.tech.includes('pascal') ? 'Object Pascal' : undefined,
    };
  }
  return {
    '@type': 'SoftwareApplication',
    ...common,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows',
  };
}

/** A documentation page. */
export function doc(d: CollectionEntry<'docs'>, path: string, projectPath: string, projectTitle: string): Node {
  return {
    '@type': 'TechArticle',
    headline: d.data.title,
    ...(d.data.description ? { description: d.data.description } : {}),
    url: abs(path),
    inLanguage: 'en-AU',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    about: { '@id': abs(`${projectPath}#software`), name: projectTitle },
  };
}

/** A store app. */
export function app(a: CollectionEntry<'apps'>, path: string): Node {
  const os = a.data.platforms.join(', ');
  const stores = [a.data.appStoreUrl, a.data.playStoreUrl].filter(Boolean);
  return {
    '@type': a.data.platforms.some((p) => p === 'iOS' || p === 'iPadOS' || p === 'Android') ? 'MobileApplication' : 'SoftwareApplication',
    '@id': abs(`${path}#app`),
    name: a.data.name,
    description: a.data.summary,
    url: abs(path),
    ...(os ? { operatingSystem: os } : {}),
    applicationCategory: a.data.category,
    publisher: { '@id': ORG_ID },
    ...(stores.length ? { sameAs: stores, installUrl: stores[0] } : {}),
    ...(a.data.minOs ? { softwareRequirements: a.data.minOs } : {}),
  };
}

/** Serialise for a <script type="application/ld+json"> block, safe against </script> in text. */
export function toJsonLd(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
