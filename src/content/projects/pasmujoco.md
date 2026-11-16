---
title: PasMuJoCo
group: robotics
summary: Object Pascal headers and thin wrapper classes for the MuJoCo physics engine, for Delphi (Win64) and Free Pascal (Linux).
visibility: public
repo: https://github.com/JohnHutch123/PasMuJoCo
license: Apache-2.0
status: wip
tech: [mujoco, delphi, freepascal, pascal, linux, github]
keywords: [MuJoCo Delphi, MuJoCo Pascal, MuJoCo Free Pascal, physics engine Delphi, robotics simulation Pascal]
references:
  - label: MuJoCo
    url: https://github.com/google-deepmind/mujoco
    note: Physics engine by Google DeepMind (Apache 2.0). PasMuJoCo loads its shared library.
  - label: MuJoCo releases
    url: https://github.com/google-deepmind/mujoco/releases
    note: Download mujoco.dll (Windows) or libmujoco.so (Linux), version 3.x.
  - label: MuJoCo documentation
    url: https://mujoco.readthedocs.io
    note: C API reference, MJCF model format and programming guide.
  - label: Robot Skills
    url: /projects/robotics/robot-skills/
    note: Open robot skill format; skills are tested in MuJoCo simulations.
  - label: PasVulkan
    url: https://github.com/BeRo1985/pasvulkan
    note: The header style PasMuJoCo follows.
order: 1
---

## Overview

PasMuJoCo lets Delphi and Free Pascal programs use [MuJoCo](https://mujoco.org), the physics engine
from Google DeepMind for robotics, biomechanics and contact-rich simulation.

It follows the style of [PasVulkan](https://github.com/BeRo1985/pasvulkan): a single translation unit whose
API entry points are function pointers, resolved at run time from the MuJoCo shared library. Nothing is
linked statically, so an application still starts when MuJoCo is missing and can report it cleanly.

## Targets

| Platform | Compiler | MuJoCo library |
|---|---|---|
| Windows x64 | Delphi 12 or 13 | `mujoco.dll` |
| Linux x86_64 | Free Pascal 3.2.2 or later | `libmujoco.so` |

MuJoCo version 3.x. The loader checks `mj_version()` and refuses a library that does not match the
header's version.

## Status and roadmap

1. Repository skeleton: done.
2. `PasMuJoCo.pas`: types, enums and structs (`mjModel`, `mjData`, `mjOption`, `mjContact`, scene structs), API function pointers, the dynamic loader and record-size tests against the C headers.
3. Thin classes `TMjModel` (load from XML or `.mjb`) and `TMjData` (`Step`, `Forward`, `Reset`), with console samples for Win64 and Linux.

Rendering is out of scope for this package. Vulkan visualisation of MuJoCo scenes is planned for
[Vulkan_Package_PRO](/projects/vulkan/vulkan-package-pro/).

## Licence

Apache License 2.0, the same licence as MuJoCo.
