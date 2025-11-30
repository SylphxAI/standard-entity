/**
 * Standard Entity Protocol
 *
 * A cross-library interface for type-safe entity operations.
 * Similar to Standard Schema - structural typing without direct imports.
 *
 * ## For Library Authors (Implementers)
 *
 * Add the `~entity` marker to your entity definitions:
 *
 * ```typescript
 * // Your library's entity definition
 * interface MyEntity<Name extends string, Fields> {
 *   readonly "~entity": {
 *     readonly name: Name;
 *     readonly type: unknown;  // or inferred type
 *   };
 *   readonly fields: Fields;
 * }
 * ```
 *
 * ## For Library Consumers
 *
 * Accept `StandardEntity` in your APIs:
 *
 * ```typescript
 * function createEntity<T extends StandardEntity>(
 *   entity: T,
 *   data: InferEntityData<T>
 * ) { ... }
 * ```
 *
 * ## Example Integration
 *
 * ```typescript
 * // Lens defines entities
 * const User = entity("User", {
 *   id: t.id(),
 *   name: t.string(),
 * });
 *
 * // Reify accepts them with full type inference
 * e.create(User, {
 *   id: temp(),     // ✅ typed as string | RefTemp
 *   name: "Alice",  // ✅ typed as string
 * });
 * ```
 *
 * @packageDocumentation
 */
// =============================================================================
// Type Guards
// =============================================================================
/**
 * Check if a value implements the StandardEntity protocol.
 *
 * @example
 * ```typescript
 * if (isStandardEntity(value)) {
 *   console.log(value["~entity"].name);
 * }
 * ```
 */
export function isStandardEntity(value) {
    return (typeof value === "object" &&
        value !== null &&
        "~entity" in value &&
        typeof value["~entity"] === "object" &&
        value["~entity"] !== null &&
        "name" in value["~entity"]);
}
