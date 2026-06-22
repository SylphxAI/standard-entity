# Agent Instructions

Engineering doctrine: https://github.com/SylphxAI/doctrine

Before changing behavior, read `PROJECT.md`, `.doctrine/project.json`, and the
triggered standards in `SylphxAI/doctrine`.

This file is a thin runtime adapter. Keep enterprise policy in doctrine; keep
only repo-local commands, hazards, and validation notes here.

## Local Commands

- `bun install`
- `bun run lint`
- `bun run typecheck`
- `bun test`
- `bun run build`
- `python3 /Users/kyle/.doctrine/scripts/project-control-plane-audit.py --local . --fail-on-drift --json`

## Local Hazards

- This repository owns a public npm protocol package. Public type/export
  changes are package contract changes.
- Keep Lens, Reify, and other consumers structurally decoupled; do not add
  consumer-specific behavior to the protocol core.
- Release behavior runs through `.github/workflows/release.yml` and the
  organization reusable release workflow.

## Reporting

Separate local diff, PR state, CI state, merge state, package release state,
and npm registry readback.
