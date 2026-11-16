---
title: PRO overview
project: vulkan-package-pro
description: What Vulkan_Package_PRO adds and how it fits with the public package.
order: 1
---

Vulkan_Package_PRO is installed alongside the public [Vulkan_Package](/projects/vulkan/vulkan-package/).
PRO depends on the public units; nothing in the public package depends on PRO.

## Installation outline

1. Install the public packages for your Delphi version (see [Getting started](/docs/vulkan-package/getting-started/)).
2. Add the public `RunTime_Src` and `Samples\Renderers` folders to your library path.
3. Build the PRO runtime package, then install the PRO design package for your Delphi version.

Licensed customers receive full setup instructions with their licence.

## Moving a form to PRO editing tools

Editing lives in `TvgEditToolManager`, a descendant of the public `TvgToolManager`. Code that calls
`SelectTool`, `Undo`, `History`, `SnapPoint` or `DeleteObject` needs the `Vulkan_EditToolManager` unit
and a `TvgEditToolManager`. A form that stores editing properties (`SnapToGrid`, `GridSize`,
`WorkPlaneOffset` and so on) must change the class in both the `.pas` field and the `.dfm`:

```pascal
object ToolManager1: TvgEditToolManager
```

## File format loaders

Each PRO loader registers with the public scene loader registry, so `vgLoadSceneFile` and
`SceneLoaderDialogFilter` pick it up by file extension. The format units read and write the files
themselves and need no Vulkan, so they also work in tools without a scene.
