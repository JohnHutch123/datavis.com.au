---
title: Getting started
project: vulkan-package
description: Install Vulkan_Package in Delphi and show your first scene.
order: 1
---

## Requirements

- Delphi XE8, 12 or 13 (Windows).
- A GPU and driver that support Vulkan 1.1 or later.
- The [Vulkan SDK](https://vulkan.lunarg.com/) if you want to compile shaders (`glslangValidator`, found through `VULKAN_SDK`).
- [PasVulkan](https://github.com/BeRo1985/pasvulkan). The repository's `PASVULKAN.md` lists the tested version and the fixes it needs.

## 1. Get the code

```bash
git clone https://github.com/JohnHutch123/Vulkan_Package.git
```

Run `SetupDependencies.bat` to fetch the dependencies at the tested versions.

## 2. Build and install the packages

Open the group project for your Delphi version (`Delphi 12\` or `Delphi 13\`). Build the runtime
packages, then install the design packages:

| Delphi | Core runtime | Core design | VCL runtime | VCL design |
|---|---|---|---|---|
| XE8 | `VulkanPkgR220` | `VulkanPkgD220` | `VulkanPkg_VCLR220` | `VulkanPkg_VCLD220` |
| 12 | `VulkanPkgR290` | `VulkanPkgD290` | `VulkanPkg_VCLR290` | `VulkanPkg_VCLD290` |
| 13 | `VulkanPkgR370` | `VulkanPkgD370` | `VulkanPkg_VCLR370` | `VulkanPkg_VCLD370` |

## 3. Copy the shaders

Copy the hand-built shaders from `VulkanShaders\` to the package's default shader folder (see
`VulkanShaders\README.md`).

## 4. Your first scene

1. **File → New → Other → Delphi Files → Vulkan Session Data Module.**
2. Right-click the module → **Build Vulkan Session**.
3. Drop a `TvgWindowVCL` on your form and set the module's `Window` property to it.
4. Drop a `TvgRenderEngine_Single` on the module, set the module's `Renderer`, then right-click → **Add Scene**.
5. Right-click → **Load Scene File…** and pick an `.obj` or `.stl` file.
6. Right-click → **Add Tool Manager** so you can orbit, pick and zoom.

At run time, start the session once the form is visible:

```pascal
procedure TForm1.FormShow(Sender: TObject);
begin
  DM.EnableSession;
end;
```

## Next steps

- [Session data module](/docs/vulkan-package/data-module/): everything the data module can do.
- [SDL2 windows](/docs/vulkan-package/sdl2-window/): render to an SDL2 window instead of a VCL control.
