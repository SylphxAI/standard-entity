# Standard Entity Project

Standard Entity defines a structural TypeScript protocol for type-safe entity
operations across libraries without requiring those libraries to import each
other.

## Lifecycle

- Lifecycle: `production`
- Layer: `foundation`
- Doctrine source of truth: [SylphxAI/doctrine](https://github.com/SylphxAI/doctrine)
- Machine manifest: `.doctrine/project.json`

## Goals

- Provide the `@sylphx/standard-entity` protocol package and type helpers.
- Preserve zero-coupling structural interoperability between entity producers
  and consumers.
- Keep package exports, README examples, type tests, and release proof aligned.

## Non-Goals

- Do not own Lens, Reify, or downstream product entity models.
- Do not encode consumer-specific persistence, validation, UI, or workflow
  semantics into the shared protocol.
- Do not publish package changes without CI and npm registry readback.

## Boundaries

This repository owns the standard entity protocol marker, exported TypeScript
types, type guards, package metadata, README contract, and tests. Consumers may
depend only on the published package export and documented structural shape.

## Public Surfaces

- `@sylphx/standard-entity` npm package export in `package.json`
- Protocol and examples in `README.md`
- CI workflow in `.github/workflows/ci.yml`
- Release workflow in `.github/workflows/release.yml`

## Delivery

PRs run the `ci` workflow. Main releases use the organization reusable release
workflow from `.github/workflows/release.yml`. Production proof is CI pass,
release workflow completion when publishing, and npm registry readback for
changed package versions.

## Commercial Direction

`not-applicable`: this repository is a foundation package/protocol. Commercial
pricing, packaging, and roadmap decisions belong to consuming products unless a
future ADR changes this package's commercial posture.
