# @sylphx/standard-entity

Standard Entity Protocol - Cross-library type-safe entity operations.

Similar to [Standard Schema](https://github.com/standard-schema/standard-schema), this package defines a protocol interface that enables type-safe entity operations across different libraries without direct imports.

## Installation

```bash
bun add @sylphx/standard-entity
```

## Usage

### For Library Authors (Implementers)

Add the `~entity` marker to your entity definitions:

```typescript
// Your library's entity definition
interface MyEntity<Name extends string, Fields> {
  readonly "~entity": {
    readonly name: Name;
    readonly type: unknown;  // or inferred type
  };
  readonly fields: Fields;
}
```

### For Library Consumers

Accept `StandardEntity` in your APIs:

```typescript
import type { StandardEntity } from "@sylphx/standard-entity";

function createEntity<T extends StandardEntity>(
  entity: T,
  data: InferEntityData<T>
) {
  // Implementation
}
```

## Example Integration

```typescript
// Lens defines entities (implements the protocol structurally)
const User = entity("User", {
  id: t.id(),
  name: t.string(),
});

// Reify accepts them with full type inference
import { entity as e } from "@sylphx/reify";

e.create(User, {
  id: temp(),     // ✅ typed as string | RefTemp
  name: "Alice",  // ✅ typed as string
});
```

## API

### `StandardEntity<TName, TData>`

The core protocol interface:

```typescript
interface StandardEntity<TName extends string = string, TData = unknown> {
  readonly "~entity": {
    readonly name: TName;
    readonly type: TData;
  };
  readonly fields?: unknown;
}
```

### `isStandardEntity(value)`

Type guard to check if a value implements the protocol.

### `InferEntityName<T>`

Extract entity name from a StandardEntity type.

### `InferEntityType<T>`

Extract entity data type from a StandardEntity type.

## Why Standard Entity?

- **Zero coupling** - Libraries don't need to import each other
- **Structural typing** - Just match the shape, no registration needed
- **Type inference** - Full TypeScript support across library boundaries
- **Extensible** - Add your own fields alongside the protocol marker

## Powered by Sylphx

Built with [@sylphx/tsconfig](https://github.com/SylphxAI/tsconfig), [@sylphx/biome-config](https://github.com/SylphxAI/biome-config), [@sylphx/doctor](https://github.com/SylphxAI/doctor), and [@sylphx/bump](https://github.com/SylphxAI/bump).

https://github.com/SylphxAI
