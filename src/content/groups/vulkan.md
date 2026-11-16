---
title: Vulkan for Delphi
summary: Delphi component packages that bring the Vulkan graphics API to VCL, FireMonkey and SDL2 applications, from an open source core to commercial CAD and editing extensions.
order: 1
tech: [vulkan, delphi, pascal, pasvulkan, vcl, fmx, sdl2, glsl]
---

## Two packages, one platform

**Vulkan_Package** is the open source core: the Vulkan session, devices, swap chains, pipelines, the
scene and render engine, cameras, lights, picking and the OBJ and STL loaders. It is released under the
zlib licence, so you can use it in closed-source and commercial applications.

**Vulkan_Package_PRO** builds on the public units without changing them. It adds interactive editing
tools with undo and redo, particle systems, a multi-threaded renderer, a shader builder, and loaders for
CAD and 3D formats including glTF, DXF, DWG, STEP, COLLADA, USD, PLY, 3DS and VRML/X3D.

## Which do I need?

| You want to… | Package |
|---|---|
| Show a 3D model in a Delphi form | Vulkan_Package |
| Learn Vulkan from Delphi | Vulkan_Package |
| Load CAD files (DXF, DWG, STEP) or glTF | Vulkan_Package_PRO |
| Let users draw, move and edit geometry, with undo | Vulkan_Package_PRO |
| Render on background threads | Vulkan_Package_PRO |

## Supported Delphi versions

Delphi XE8, 12 Athens and 13 Florence. Every package name ends with the version of the Delphi release it is built for (for example `VulkanPkgR290` for Delphi 12 and `VulkanPkgR370` for Delphi 13).
