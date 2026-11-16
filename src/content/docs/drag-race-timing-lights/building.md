---
title: Building from source
project: drag-race-timing-lights
description: Build Drag Tree for Android, iOS and Windows with RAD Studio.
order: 2
---

## Requirements

- RAD Studio / Delphi 12 with the FireMonkey platforms you want.
- For iOS: a Mac with PAServer and Xcode, and an Apple developer provisioning profile.

## Build

```bash
git clone https://github.com/JohnHutch123/DragRaceTimingLights.git
```

Open `DragTree.dproj`. These target platforms are already set up: Android 32/64-bit, iOS Device 64-bit,
iOS Simulator ARM64, and Windows 32/64-bit.

- **Android:** choose *Android 64-bit*, select your phone under Target, and Run. If the build complains about missing Java libraries, right-click *Libraries* under the Android target in Project Manager and choose *Revert System Files to Default*.
- **iOS:** choose *iOS Device 64-bit* with your Mac connected through PAServer.

If RAD Studio refuses the project file, delete `DragTree.dproj`, open `DragTree.dpr` instead (the IDE
creates a fresh project file), and add the Android and iOS targets with right-click *Target Platforms >
Add Platform*.

## Files

| File | Contents |
|---|---|
| `DragTree.dpr`, `DragTree.dproj` | Project |
| `MainForm.pas`, `MainForm.fmx` | Tree drawing, timing and user interface |
| `Icons/` | App icons for Android, iOS, macOS and Windows |
| `PrivacyInfo.xcprivacy` | Apple privacy manifest |
| `docs/` | Step-by-step App Store and Google Play publishing guides |

## Store submission

The repository's `docs/AppStore-guide.md` and `docs/PlayStore-guide.md` walk through publishing. For the
store listings use:

- **Support URL:** `https://www.datavis.com.au/apps/drag-tree/support/`
- **Privacy policy URL:** `https://www.datavis.com.au/apps/drag-tree/privacy/`
- **Google Play Data safety:** the app collects and shares no user data.
