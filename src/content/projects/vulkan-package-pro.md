---
title: Vulkan_Package_PRO
group: vulkan
summary: Commercial extensions for Vulkan_Package. Adds CAD and 3D file formats, interactive editing with undo and redo, particles, a multi-threaded renderer and a shader builder.
visibility: private
license: Commercial
status: active
enquire: Enquire about a PRO licence
tech: [vulkan, delphi, pascal, pasvulkan, gltf, glsl]
order: 2
---

<!-- This repository is private: this page describes features only. Do not add
     source code, internal paths or setup details you don't want public. -->

## Overview

Vulkan_Package_PRO extends the open source [Vulkan_Package](/projects/vulkan/vulkan-package/).
It builds on the public units and does not change them, so you can move a project to PRO without
rewriting it.

## Features

- **Editing tools:** `TvgEditToolManager` adds tools for adding lines, selecting, moving, editing vertices and deleting, with undo and redo, snapping and work planes.
- **CAD and 3D file formats:** read and write glTF 2.0, DXF, COLLADA, USD (text), PLY, 3DS and VRML/X3D; read STEP and IES photometric files; DWG through the ODA File Converter.
- **Particle systems:** `TvgParticleSystem` with its own GPU shaders.
- **Multi-threaded rendering:** a renderer that records on its own threads, and OmniThreadLibrary integration.
- **Shader builder:** a component and a desktop app for building shaders.
- **Computational geometry:** natural neighbour interpolation, Delaunay display and spring systems.

## File formats

| Format | Extensions | Read | Write |
|---|---|---|---|
| glTF 2.0 | `.gltf` `.glb` | Yes | Yes |
| AutoCAD DXF | `.dxf` | Yes | Yes |
| AutoCAD DWG | `.dwg` | Yes | Via ODA File Converter |
| VRML / X3D | `.wrl` `.x3d` `.x3dv` `.iv` | Yes | Yes |
| COLLADA | `.dae` | Yes | Yes |
| USD (text) | `.usda` | Yes | Yes |
| Stanford PLY | `.ply` | Yes | Yes |
| 3D Studio | `.3ds` | Yes | Yes |
| STEP | `.stp` `.step` | Yes | No |
| IES photometric | `.ies` | Yes | No |

Every loader registers with the public scene loader registry, so the standard *Load Scene File…*
command picks it up by file extension.

## Requirements

Delphi 12 or 13, and Vulkan_Package installed. The multi-threaded renderer needs OmniThreadLibrary.

## Licensing

Vulkan_Package_PRO is proprietary software, available under a commercial licence. [Contact us](/contact/)
for pricing, evaluation and custom work.
