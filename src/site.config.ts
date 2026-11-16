// ---------------------------------------------------------------------------
// Site-wide settings. Change business details here once and every page
// (footer, contact, support and privacy pages) picks them up.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Datavis',
  legalName: 'Datavis Pty Ltd',
  // Fill in your ABN; leave '' to hide it.
  abn: '80 094 434 849',
  tagline: 'Graphics, simulation and engineering software',
  description:
    'Datavis Pty Ltd builds Vulkan graphics components for Delphi, MuJoCo simulation and robot skill tools, motorsport apps and data tools, and drill and blast software.',
  url: 'https://www.datavis.com.au',
  country: 'Australia',
  // Suggested: create support@ and privacy@ aliases that forward to your inbox.
  email: {
    general: 'johnh@datavis.com.au',
    support: 'johnh@datavis.com.au',
    privacy: 'johnh@datavis.com.au',
  },
  // Target time to reply to support requests (shown on support pages).
  supportResponse: 'four business days',
  github: {
    user: 'JohnHutch123',
    url: 'https://github.com/JohnHutch123',
  },
  // The date the general privacy policy last changed (YYYY-MM-DD).
  privacyUpdated: '2026-11-16',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact/' },
] as const;
