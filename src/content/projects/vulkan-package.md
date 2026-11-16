---
title: Vulkan_Package
group: vulkan
summary: An open source Delphi component package for the Vulkan graphics API. Drop components on a form, build a session at design time and see your scene in the IDE.
visibility: public
repo: https://github.com/JohnHutch123/Vulkan_Package
license: zlib
status: active
tech: [vulkan, delphi, pascal, pasvulkan, vcl, fmx, sdl2, glsl, github]
order: 1
---

## Overview

Vulkan_Package is a component-oriented Vulkan framework for Delphi, built on the
[PasVulkan](https://github.com/BeRo1985/pasvulkan) bindings. It wraps the parts of Vulkan every
application needs (instance, physical and logical devices, swap chain, pipelines, descriptors and
buffers) in `TComponent` descendants you configure in the Object Inspector.

## Features

- **Session components:** `TvgInstance`, `TvgPhysicalDevice`, `TvgScreenRenderDevice` and `TvgLinker` connect like a database connection and its datasets.
- **Session data module:** `TvgVulkanDataModule` holds a whole Vulkan session and can build and wire it for you from the IDE.
- **Design-time preview:** set `Active` to True on any session component to start the session in the IDE. If it can't start, the reason is shown.
- **Scene and rendering:** scenes, data stores, the single-threaded render engine `TvgRenderEngine_Single`, cameras, lights, HUD and compute.
- **Interaction:** `TvgToolManager` provides camera orbit, CPU and GPU picking, selection and zoom-to-fit, with virtual hooks for your own tools.
- **Windows:** VCL (`TvgWindowVCL`), SDL2 (`TvgSDL2Window`) and FireMonkey.
- **File formats:** OBJ (geometry and materials) and STL (read and write), with a registry that lets you add your own loaders.
- **Shaders:** hand-built GLSL shaders compiled to SPIR-V with `glslangValidator`.

## Quick start

```pascal
// In a form with a TvgVulkanDataModule (DM) and a TvgWindowVCL:
procedure TForm1.FormShow(Sender: TObject);
begin
  DM.EnableSession;          // start Vulkan once the form is visible
  DM.LoadScene('model.obj'); // load with the registered OBJ loader
end;
```

See [Getting started](/docs/vulkan-package/getting-started/) for installation, and the
[session data module guide](/docs/vulkan-package/data-module/) for the full design-time workflow.

## Licence

Released under the **zlib licence**. You may use it in closed-source and commercial applications.
Copyright © 2021–2026 Datavis.
