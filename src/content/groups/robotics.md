---
title: Robotics and simulation
summary: Physics simulation for Object Pascal through MuJoCo, and Robot Skills, an open format for packaging humanoid robot skills so they can be tested in simulation and shared between robots.
order: 2
tech: [mujoco, delphi, freepascal, python, postgresql]
---

## How the projects fit together

**PasMuJoCo** brings the [MuJoCo](https://mujoco.org) physics engine to Delphi and Free Pascal, so
robots, mechanisms and contact-rich scenes can be simulated from Object Pascal applications. Rendering of
MuJoCo scenes is planned for [Vulkan_Package_PRO](/projects/vulkan/vulkan-package-pro/).

**Robot Skills (RS)** is an open, platform-independent format for describing what a robot should do,
such as opening a bottle or ironing a shirt, as small, signed, nestable packets. Skills are meant to be
tested in simulation before they reach a real robot, and MuJoCo scene files are the likely base for those
repeatable tests.

Together they work towards a Pascal toolchain that can load a skill, run it in a MuJoCo simulation and
view the result with Vulkan.

## External libraries

- [MuJoCo](https://github.com/google-deepmind/mujoco) by Google DeepMind (Apache 2.0): the physics engine behind PasMuJoCo and the planned simulator tests for Robot Skills.
- [MuJoCo documentation](https://mujoco.readthedocs.io): the C API, XML model format (MJCF) and programming guide.
- [Robot Skills](https://github.com/JohnHutch123/Robot-Skills): the open specification, examples, validator and library prototype.
