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
  // Which mailbox each kind of request goes to.
  email: {
    general: 'johnh@datavis.com.au',            // general enquiries, About page
    support: 'techsupport@datavis.com.au',      // app and package help; app store support pages
    sales: 'marketsupport@datavis.com.au',      // licensing, PRO packages, custom work, project enquiries
    accounts: 'accountsupport@datavis.com.au',  // invoices, payments, licence accounts
    privacy: 'accountsupport@datavis.com.au',   // data requests, app account deletion
  },
  // Target time to reply to support requests (shown on support pages).
  supportResponse: 'four business days',
  github: {
    user: 'JohnHutch123',
    url: 'https://github.com/JohnHutch123',
  },
  // The date the general privacy policy last changed (YYYY-MM-DD).
  privacyUpdated: '2026-11-16',
  // The date the terms of service last changed (YYYY-MM-DD).
  termsUpdated: '2026-11-22',
  // State or territory whose laws govern the terms, e.g. 'Queensland'.
  // Leave '' to say "the laws in force in Australia".
  legalState: '',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact/' },
] as const;
