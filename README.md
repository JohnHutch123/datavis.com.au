# Datavis website

The website for Datavis Pty Ltd: Home, About, Projects, Contact, documentation for each project,
and a support page and privacy page for each store app.

It is a static site built with [Astro](https://astro.build). Every page is generated from Markdown files
into plain HTML and CSS. There is no server code, database or login, and the published pages run no
JavaScript, so there is very little to attack.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 LTS or later (install it once with `winget install OpenJS.NodeJS.LTS`).

```bash
npm install      # once, and after updating dependencies
npm run dev      # preview at http://localhost:4321 (shows drafts, reloads as you edit)
npm run build    # checks every page and writes the finished site to dist/
```

## Where things are

| To change… | Edit |
|---|---|
| Company name, ABN, emails, GitHub link | `src/site.config.ts` |
| Home, About, Contact pages | `src/pages/index.astro`, `about.astro`, `contact.astro` |
| General privacy policy and support page | `src/pages/privacy.astro`, `support.astro` |
| Project groups | `src/content/groups/*.md` |
| Projects | `src/content/projects/*.md` |
| Documentation | `src/content/docs/<project>/*.md` |
| Store apps | `src/content/apps/*.md` |
| Logo | `public/images/datavis-logo.svg` and `public/favicon.svg` |
| Colours and fonts | top of `src/styles/global.css` |
| Technology badges | `src/data/tech.ts` |

Copy-ready templates for each content type are in [`templates/`](templates/).

## Add, change or remove content

The file name becomes the URL, so use lower case with hyphens (`my-project.md`).

- **Add a project:** copy `templates/project.md` to `src/content/projects/<name>.md` and set `group:` to the name of a file in `src/content/groups/`. The page appears at `/projects/<group>/<name>/`.
- **Add a group:** copy `templates/group.md` to `src/content/groups/<name>.md`.
- **Add documentation:** create `src/content/docs/<project>/<page>.md` (see `templates/doc.md`). `order:` sets the order in the sidebar. Pages appear at `/docs/<project>/<page>/`.
- **Add an app:** copy `templates/app.md` to `src/content/apps/<name>.md`.
- **Hide something without deleting it:** add `draft: true`. Drafts show in `npm run dev` but are not published.
- **Remove something:** delete the file. If other content links to it, `npm run build` tells you.
- **Files whose names start with `_`** are ignored, so you can keep notes beside the content.

If a front-matter field is missing or misspelt, the build stops and names the file and field.

### Private repositories

Set `visibility: private` on a project. The page then shows a "Commercial" label and an enquiry button
and never links to the repository. Only write what you are happy to make public: the site itself is public.

## App Store and Google Play URLs

Each app file in `src/content/apps/` generates:

| Page | URL | Use it for |
|---|---|---|
| App page | `/apps/<app>/` | Marketing URL (Apple), website (Google) |
| Support | `/apps/<app>/support/` | **Support URL** (Apple, required) and support link (Google) |
| Privacy | `/apps/<app>/privacy/` | **Privacy Policy URL** (Apple and Google, required) |
| Delete account | `/apps/<app>/delete-account/` | Google Play **account deletion URL**, only if `privacy.accounts: true` |

There is also a site-wide `/support/` and `/privacy/` page.

Checklist before submitting an app:

1. Fill in the app's `privacy:` section so it matches your answers to Apple's **App Privacy** questions and Google's **Data safety** form. The stores compare them.
2. Make sure the support email in `src/site.config.ts` (or the app's `supportEmail`) is monitored.
3. Remove `draft: true`, build, publish, and open the support and privacy URLs to check they load.
4. Paste the URLs into App Store Connect (App Information → Privacy Policy URL; version page → Support URL) and Play Console (Store settings → contact details; App content → Privacy policy, Data safety).
5. After the app is live, add `appStoreUrl` and `playStoreUrl` so the download buttons appear.

The privacy policy text is a starting point for a small Australian business, written to the Australian
Privacy Principles. It is not legal advice; check it against what each app really does.

## Publish

### GitHub Pages (how www.datavis.com.au is published)

This repository, `JohnHutch123/datavis.com.au`, is published by GitHub Pages at www.datavis.com.au.

1. One-time switch: in the repository go to **Settings → Pages** and change **Source** from "Deploy from a branch" to **GitHub Actions**. Keep the custom domain `www.datavis.com.au` and **Enforce HTTPS** ticked.
2. Every push to `main` then builds and publishes the site (see `.github/workflows/deploy.yml`).
3. Check a change before it goes live by working on a branch and opening a pull request; the site only changes when it is merged into `main`.

`public/CNAME` keeps the custom domain in the published files.

Free GitHub Pages needs a public repository. That is fine for this site, because everything in it is
published anyway. If you want the repository private, use Cloudflare Pages.

### Cloudflare Pages (private repo, extra security headers)

Connect the repository in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git),
with build command `npm run build` and output directory `dist`. Cloudflare applies the security headers
in `public/_headers` automatically.

## Security notes

- The site is static HTML: no server, database, forms or third-party scripts.
- A strict Content Security Policy is set on every page, and `public/_headers` adds HSTS, frame blocking and other headers where the host supports it.
- The contact page uses email links, so there is no form for bots to abuse. If you want a web form later, use a hosted form service and add its domain to `form-action` in the CSP.
- Dependabot (`.github/dependabot.yml`) opens pull requests when dependencies have security updates.
- Turn on two-factor authentication for your GitHub and domain registrar accounts. They are the real keys to the site.
- Never commit secrets. `.env` files are ignored by git.

## Trademarks

Technology names appear as text badges, not official logos. If you add official logos, follow each
owner's guidelines: [Khronos (Vulkan)](https://www.khronos.org/legal/trademarks/),
[GitHub](https://github.com/logos), [Embarcadero (Delphi)](https://www.embarcadero.com/),
[Anthropic (Claude)](https://www.anthropic.com/), [Apple App Store badges](https://developer.apple.com/app-store/marketing/guidelines/),
[Google Play badges](https://play.google.com/intl/en_us/badges/).
