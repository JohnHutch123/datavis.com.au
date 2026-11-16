---
# Copy to src/content/apps/<app-name>.md
# Pages: /apps/<app-name>/  /apps/<app-name>/support/  /apps/<app-name>/privacy/
name: App Name
summary: One or two sentences about the app.
project: my-project           # optional: links the app to a project page
platforms: [iOS, Android]     # iOS | iPadOS | macOS | Android | Windows
category: UtilitiesApplication # or BusinessApplication, DesignApplication, EducationalApplication…
appStoreUrl: https://apps.apple.com/app/id0000000000
playStoreUrl: https://play.google.com/store/apps/details?id=au.com.datavis.appname
# supportEmail: appname@datavis.com.au   # defaults to the support email in site.config.ts
minOs: iOS 16 or later, Android 10 or later
privacy:
  updated: 2026-11-16         # change whenever the app's data practices change
  collectsData: false
  data: []                    # see src/content/apps/example-app.md for the format
  thirdParties: []
  accounts: false             # true adds the Google Play account deletion page
faq:
  - q: A common question?
    a: Its answer.
order: 10
---

## About the app

Description, screenshots (put them in public/images/) and release notes.
