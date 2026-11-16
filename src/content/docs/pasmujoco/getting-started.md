---
title: Getting started
project: pasmujoco
description: Get the MuJoCo library and add PasMuJoCo to a Delphi or Free Pascal project.
order: 1
---

> PasMuJoCo is a work in progress. The header translation and wrapper classes are being written now, so
> the API below may change.

## 1. Get MuJoCo

PasMuJoCo loads the MuJoCo shared library at run time. Download a 3.x release from the
[MuJoCo releases page](https://github.com/google-deepmind/mujoco/releases):

- **Windows:** `mujoco-<version>-windows-x86_64.zip`. Put `bin\mujoco.dll` next to your executable or on `PATH`.
- **Linux:** `mujoco-<version>-linux-x86_64.tar.gz`. Put `lib/libmujoco.so*` on `LD_LIBRARY_PATH`, or pass a full path to the loader.

## 2. Get PasMuJoCo

```bash
git clone https://github.com/JohnHutch123/PasMuJoCo.git
```

| Folder | Contents |
|---|---|
| `src/` | `PasMuJoCo.inc` (shared defines) and `PasMuJoCo.pas` (C API translation and loader) |
| `packages/Delphi12/`, `packages/Delphi13/` | Runtime packages |
| `samples/` | Small console programs |
| `tests/` | Record-layout and smoke tests |

## 3. Use it

### Delphi 12 or 13 (Win64)

Open `packages/Delphi12/PasMuJoCo.dpk` or `packages/Delphi13/PasMuJoCo.dpk`, or add `src` to your
project's search path. `{$LIBSUFFIX AUTO}` gives each IDE its own BPL (`PasMuJoCo290.bpl` for Delphi 12,
`PasMuJoCo370.bpl` for Delphi 13), so both can be installed side by side.

### Free Pascal (Linux x86_64)

Add `-Fusrc -Fisrc` to your `fpc` command line, or add `src` to your Lazarus project's unit paths.

## How loading works

Every MuJoCo function is a function pointer, filled in when the library is loaded (`LoadLibrary` and
`GetProcAddress` on Windows, `dlopen` and `dlsym` on Linux). Because nothing is linked statically, your
program starts even without MuJoCo installed and can tell the user what is missing. The loader also checks
`mj_version()` and refuses a library whose version doesn't match the header.

## Further reading

- [MuJoCo documentation](https://mujoco.readthedocs.io): the programming guide, C API and MJCF model format.
- [MuJoCo on GitHub](https://github.com/google-deepmind/mujoco): source, releases and example models.
- [Robot Skills](/projects/robotics/robot-skills/): the open skill format that uses MuJoCo for simulator tests.
