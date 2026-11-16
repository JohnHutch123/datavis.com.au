---
# EXAMPLE APP. It is a draft, so it shows in `npm run dev` but is left out of
# the published site. Copy this file for each real app, rename it (the file
# name becomes the URL: /apps/<file-name>/), fill it in and remove `draft`.
name: Example Viewer
summary: View 3D models on your phone or tablet. Open OBJ, STL and glTF files, orbit, zoom and measure.
project: vulkan-package
platforms: [iOS, iPadOS, Android]
# Paste the store links once the app is live:
# appStoreUrl: https://apps.apple.com/app/id0000000000
# playStoreUrl: https://play.google.com/store/apps/details?id=au.com.datavis.example
minOs: iOS 16 or later, Android 10 or later
privacy:
  updated: 2026-11-16
  collectsData: false
  # If the app does collect data, set collectsData: true and list each kind,
  # matching your App Store "App Privacy" and Google Play "Data safety" answers:
  # data:
  #   - category: Crash data
  #     purpose: Finding and fixing crashes
  #     linkedToUser: false
  #     shared: false
  #     optional: true
  # thirdParties:
  #   - name: Firebase Crashlytics
  #     purpose: crash reporting
  #     policyUrl: https://firebase.google.com/support/privacy
  accounts: false
faq:
  - q: Which file formats can I open?
    a: OBJ, STL and glTF (.gltf and .glb). Open a file from the Files app, an email attachment or another app's share menu.
  - q: Does the app upload my models?
    a: No. Files are opened and rendered on your device and are never sent to us.
  - q: How do I report a problem?
    a: Email us from the support page with your device, operating system version and the file that caused the problem, if you can share it.
draft: true
---

## About the app

A fast 3D model viewer built on the same Vulkan rendering engine as our Delphi packages.

## Features

- Open OBJ, STL and glTF models from Files, email or other apps.
- Orbit, pan and zoom with touch gestures.
- Measure distances between points.
- Works offline; your files stay on your device.
