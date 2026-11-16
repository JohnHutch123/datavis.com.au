---
title: Robot Skills
group: robotics
summary: An open, platform-independent format for packaging humanoid robot skills, like opening a bottle or ironing a shirt, as compact, signed, nestable packets that can be tested in simulation and shared through an open library.
visibility: public
repo: https://github.com/JohnHutch123/Robot-Skills
license: Apache-2.0
status: active
tech: [python, postgresql, mujoco, github]
keywords: [robot skills format, humanoid robot skills, robot skill library, portable robot skills, robot task specification]
references:
  - label: Robot Skills specification v0.1
    url: https://github.com/JohnHutch123/Robot-Skills/blob/main/spec/rs-spec-v0.1.md
    note: The draft format specification.
  - label: MuJoCo
    url: https://mujoco.org
    note: Simulator for repeatable skill tests; MuJoCo scene files are the likely base.
  - label: PasMuJoCo
    url: /projects/robotics/pasmujoco/
    note: MuJoCo for Delphi and Free Pascal.
  - label: CBOR (RFC 8949)
    url: https://www.rfc-editor.org/rfc/rfc8949
    note: Deterministic binary encoding for skill packets.
  - label: COSE (RFC 9052)
    url: https://www.rfc-editor.org/rfc/rfc9052
    note: Signing of skill packets, with Ed25519.
  - label: RoboEarth
    url: https://en.wikipedia.org/wiki/RoboEarth
    note: Its Semantic Robot Description Language is the basis for robot capability profiles.
  - label: Prior art survey
    url: https://github.com/JohnHutch123/Robot-Skills/blob/main/docs/prior-art.md
    note: Existing systems and why RS is designed the way it is.
order: 2
---

## Overview

A robot skill should be something you can hand from one robot to another, like a recipe. Robot Skills (RS)
is an open draft format that describes *what* to do and *where things move relative to objects*, rather
than the joint angles of one particular robot. Each robot maps a skill onto its own body.

> **Status:** early draft (v0.1), open for discussion. The repository has the specification, examples, a
> PostgreSQL library prototype and a Python validator for YAML/JSON skill sources. There is no packet
> compiler or robot runtime yet, and no example is an executable skill.

## Principles

- **Portable:** skills describe goals and object-relative motion, not one robot's joints.
- **Compact:** a typical packet is a few kilobytes; motions are small mathematical primitives, not recordings.
- **Nestable:** "iron a shirt" can reuse "grasp an object" and "lay a garment flat".
- **Learnable:** a robot downloads a skill, adapts it to its own tools and can publish improvements as variants.
- **Trustworthy:** every skill carries provenance (author, origin, tests) and is signed by its author and, once tested, by the library.
- **Open:** skills can be written by hand or recorded from a person, tested in simulation such as [MuJoCo](https://mujoco.org), and shared through an open library.

## Safety

Robot safety remains the robot manufacturer's responsibility. RS describes skills; it does not replace
manufacturer safety controls or certify safe execution.

## Get involved

Ideas, reviews and criticism are welcome as [GitHub issues](https://github.com/JohnHutch123/Robot-Skills/issues).
See the [overview](/docs/robot-skills/overview/) for an example skill and the main design choices.

## Licence

The specification, examples and tools are Apache 2.0. Skills published to the RS library default to
CC BY 4.0 (authors may choose CC0).
