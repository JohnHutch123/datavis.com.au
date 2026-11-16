---
title: Overview and example
project: robot-skills
description: What a Robot Skills (RS) skill looks like, and the main design choices in the v0.1 draft.
order: 1
---

## What a skill looks like

Skills are written in a small text language (`.rsk`), or in YAML. This shortened example opens a bottle
with a bottle opener, reusing a "grasp an object" skill for each hand:

```text
rs 0.1

skill open-bottle-with-opener 1.0.0 {
  id      0192f3a4-7c1e-7b2a-9d4e-5a1f6c3b8e20   # global ID (UUID v7)
  title   "Open a capped bottle with a bottle opener"
  class   RS 2.1.2                        # Changing quantity > Divide > Detach a part
  tags    object:bottle tool:bottle-opener body:two-hands domain:kitchen
  needs   ArmMotion x2, GripperMotion x2, Grasping, ForceSensing, Camera

  pre     upright(bottle), capped(bottle), reachable(opener)
  effect  not capped(bottle)
  success not capped(bottle) and upright(bottle) within 30 s

  plan sequence {
    use grasp-object >=1.0 (target: bottle.neck, hand: left)
    use grasp-object >=1.0 (target: opener.handle, hand: right)
    position opener.lip to bottle.cap.rim  motion: approach
    retry 3 {
      rotate opener about opener.lip by 25 deg  motion: lever  force <= 40 N
      check not capped(bottle)
    }
    release opener
  }
}
```

The full examples are in the repository's
[`examples/skills/`](https://github.com/JohnHutch123/Robot-Skills/tree/main/examples/skills) folder. They
are explanatory and intentionally contain placeholder keys and weights.

## Design choices in v0.1

| Area | Choice |
|---|---|
| Source format | `.rsk` text language, with YAML accepted; both compile to a binary packet (`.rsp`) |
| Binary packet | Deterministic [CBOR (RFC 8949)](https://www.rfc-editor.org/rfc/rfc8949), signed with [COSE (RFC 9052)](https://www.rfc-editor.org/rfc/rfc9052) and Ed25519 |
| Action words | The handling functions of VDI 2860 (storing, changing quantity, moving, securing, checking), plus a few RS additions |
| Robot capabilities | Based on RoboEarth's Semantic Robot Description Language (SRDL) |
| Classification | Open-ended `RS` class codes, like a library catalogue, plus searchable tags |
| Identity | Every skill has a UUID v7; every published version also has a content hash |
| Open library | A relational database ranks skills by measured success rate, number of robots using them and ratings |

## Testing in simulation

Each skill records how it was tested, for example `tested sim:mujoco robots: generic-humanoid runs: 50
passed: 47`. A standard test-scene format, so the library can repeat a skill's tests, is one of the open
questions for v0.2. [MuJoCo](https://mujoco.org) scene files are the likely base, and
[PasMuJoCo](/projects/robotics/pasmujoco/) brings MuJoCo to Delphi and Free Pascal.

## What exists today

- The draft [specification](https://github.com/JohnHutch123/Robot-Skills/blob/main/spec/rs-spec-v0.1.md) and a [survey of prior art](https://github.com/JohnHutch123/Robot-Skills/blob/main/docs/prior-art.md).
- Example skills and robot capability profiles.
- A PostgreSQL schema, queries and sample data for the open skill library.
- A Python authoring validator with a JSON Schema and a command-line tool.

Not yet: the `.rsk` parser, packet compiler, signature tooling and a robot runtime.
