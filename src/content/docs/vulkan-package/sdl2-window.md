---
title: SDL2 windows
project: vulkan-package
description: Present a Vulkan session in an SDL2 window with TvgSDL2Window.
order: 3
---

`TvgSDL2Window` presents a session in an SDL2 window instead of a VCL control. Create it in code and
link it the same way as `TvgWindowVCL`:

```pascal
Window := TvgSDL2Window.Create(Self);
Window.Caption    := 'Model';
Window.VulkanLink := Linker1;
Instance1.Active  := True;      // creates the SDL window and its surface
```

## Events

Call `TvgSDL2Window.ProcessEvents` regularly, from `Application.OnIdle`, a timer or your own loop. It
forwards mouse, wheel and key events to the linker and its tool manager, rebuilds the swap chain on resize
and repaints on expose.

## Closing

Closing fires `OnClose`. Unless your handler refuses, that window's linker is disabled and the SDL window
destroyed, while other windows keep running. Set `Active := True` to open it again.

## SDL lifetime

SDL starts with the first window and stops with the last, so linking the unit alone does not touch it.
SDL 2.0.6 or later is required.

## Packages and DLLs

The runtime package is `VulkanPkg_SDL2Rxxx` (it requires the matching `VulkanPkgRxxx`;
`VulkanPkg_SDL2_220D` for XE8). PasVulkan links against `sdl2.dll` on Win32 but `sdl264.dll` on Win64,
so a Win64 application has to ship SDL2.dll under that name.
