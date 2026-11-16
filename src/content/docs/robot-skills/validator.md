---
title: Python validator
project: robot-skills
description: Check YAML or JSON skill sources against the rs-0.1-authoring-v1 profile.
order: 2
---

The first working Robot Skills tool is a Python validator for skill sources written in YAML or JSON. It
checks them against **`rs-0.1-authoring-v1`**, a deliberately limited authoring profile on the way to v0.2.

It does not run plans, resolve dependencies, verify signatures or certify motion accuracy, and passing it
does not authorise running a skill on a robot. Robot safety remains the manufacturer's responsibility.

## Install and run

Python 3.11 or later. From the repository root, in PowerShell:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install .
.\.venv\Scripts\python.exe -m robot_skills tests\fixtures\position-cup.yaml
```

Installing also provides an `rs-validate` command. Add `--json` for machine-readable output and
`--warnings-as-errors` to fail on warnings. Exit codes: `0` passed, `1` invalid or unreadable input,
`2` invalid command-line usage.

The package depends on PyYAML and jsonschema. The fixture `tests/fixtures/position-cup.yaml` passes; the
older bottle example keeps placeholder keys and weights and fails on purpose.

## What is checked

- **Structure**, with a packaged JSON Schema (Draft 2020-12): required fields, types, unknown fields, UUID v7 and SemVer syntax, class and tag syntax, provenance and the action vocabulary.
- **Meaning:** object and part paths, motion and data references, durations, physical limits and units, force caps, condition syntax, date ordering, simulator pass counts, and the sizes of stored motion data.

Every `use` of another skill produces a `dependency.unresolved` warning, because there is no catalogue
resolver yet.

## More detail

See [`docs/validator.md`](https://github.com/JohnHutch123/Robot-Skills/blob/main/docs/validator.md) in the
repository for the full rules, the read/write API and plans for a later Delphi interface.
