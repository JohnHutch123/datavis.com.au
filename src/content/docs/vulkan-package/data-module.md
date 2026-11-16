---
title: Session data module
project: vulkan-package
description: Hold a whole Vulkan session in one TvgVulkanDataModule and connect it to any form.
order: 2
---

`TvgVulkanDataModule` is a `TDataModule` descendant that holds a whole Vulkan session,
`TvgInstance` → `TvgPhysicalDevice` → `TvgScreenRenderDevice` → `TvgLinker`, and connects it to a
`TvgWindowVCL` on any form.

## Create and build a session

- **Create one:** File → New → Other → Delphi Files → *Vulkan Session Data Module*.
- **Build the session:** right-click the module → *Build Vulkan Session*. This adds and wires the components.
- **Connect the window:** set the module's `Window` property to a `TvgWindowVCL`.
- **Enable or disable at design time:** right-click → *Enable/Disable Vulkan Session*, or toggle `SessionActive`.

## More than one window

Right-click → *Add Linker* (or drop a `TvgLinker` and set its `ScreenDevice`), then set the second
`TvgWindowVCL`'s `VulkanLink` to it. Every linker connected under the instance is part of the session.
Each extra window gets its own tool manager: set its linker's `ToolManager`.

## Connect in the Object Inspector

`PhysicalDevice.Instance`, `ScreenDevice.PhysicalDevice`, `Linker.ScreenDevice` and
`VulkanWindow.VulkanLink` drop down the matching components in every open form and module, the same way
a dataset's `Connection` does.

## Test it like a dataset

Set `Active` to True on any session component (instance, device, linker or window) at design time to
start the whole session it belongs to. If it can't start, the reason is shown.

## Scenes

Drop a renderer (for example `TvgRenderEngine_Single`), set the module's `Renderer`, then right-click →
*Add Scene*.

- *Load Scene File…* picks a file and loads it with a registered scene loader.
- `SceneLoaderType` lists the registered loaders (blank chooses by file extension).
- `LoadSceneOnEnable` reloads the scene whenever the session is enabled, at design time too.

In code:

```pascal
DM.LoadScene('model.obj');
```

## Tool manager

Right-click → *Add Tool Manager* creates a `TvgToolManager` in camera orbit mode, connected to the
primary linker, scene and renderer. `ZoomAllOnLoad` (on by default) frames each loaded scene. Any
`TvgToolManager` descendant can be assigned to `ToolManager` instead.

## Writing a scene loader

Scene loaders register themselves in `Vulkan_SceneLoaders`. The STL unit does this:

```pascal
RegisterSceneLoader(TvgSceneLoaderStorer_STL, 'STL', 'STL mesh', '.stl', 'FileName');
```

The last argument is the loader's published file-name property.

## Run time

Call `EnableSession` once the window's form is showing (for example in `OnShow`), and
`DisableSession` to shut down.
