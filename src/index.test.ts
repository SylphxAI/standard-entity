import { describe, expect, test } from 'bun:test'
import {
	type EntityMarker,
	type InferEntityName,
	type InferEntityType,
	isStandardEntity,
	type SimpleEntity,
	type StandardEntity,
} from './index'

describe('StandardEntity', () => {
	test('isStandardEntity returns true for valid entity', () => {
		const entity: StandardEntity<'User', { id: string }> = {
			'~entity': {
				name: 'User',
				type: undefined as unknown as { id: string },
			},
		}

		expect(isStandardEntity(entity)).toBe(true)
	})

	test('isStandardEntity returns false for non-entity', () => {
		expect(isStandardEntity(null)).toBe(false)
		expect(isStandardEntity(undefined)).toBe(false)
		expect(isStandardEntity({})).toBe(false)
		expect(isStandardEntity({ name: 'User' })).toBe(false)
		expect(isStandardEntity({ '~entity': null })).toBe(false)
		expect(isStandardEntity({ '~entity': {} })).toBe(false)
	})

	test('isStandardEntity returns true for entity with fields', () => {
		const entity = {
			'~entity': {
				name: 'Post',
				type: undefined,
			},
			fields: {
				title: { type: 'string' },
			},
		}

		expect(isStandardEntity(entity)).toBe(true)
	})
})

describe('Type inference', () => {
	test('InferEntityName extracts name', () => {
		type UserEntity = StandardEntity<'User', { id: string }>
		type Name = InferEntityName<UserEntity>

		// Type-level test - if this compiles, it works
		const name: Name = 'User'
		expect(name).toBe('User')
	})

	test('InferEntityType extracts data type', () => {
		type UserData = { id: string; name: string }
		type UserEntity = StandardEntity<'User', UserData>
		type Data = InferEntityType<UserEntity>

		// Type-level test - if this compiles, it works
		const data: Data = { id: '1', name: 'Alice' }
		expect(data.id).toBe('1')
		expect(data.name).toBe('Alice')
	})
})

describe('EntityMarker', () => {
	test('can create entity with EntityMarker', () => {
		interface MyEntity<N extends string, D> extends EntityMarker<N, D> {
			readonly customProp: string
		}

		const entity: MyEntity<'Custom', { value: number }> = {
			'~entity': {
				name: 'Custom',
				type: undefined as unknown as { value: number },
			},
			customProp: 'test',
		}

		expect(isStandardEntity(entity)).toBe(true)
		expect(entity['~entity'].name).toBe('Custom')
		expect(entity.customProp).toBe('test')
	})
})

describe('SimpleEntity', () => {
	test('SimpleEntity is a valid StandardEntity', () => {
		const entity: SimpleEntity<'Simple', { foo: string }> = {
			'~entity': {
				name: 'Simple',
				type: undefined as unknown as { foo: string },
			},
		}

		expect(isStandardEntity(entity)).toBe(true)
		expect(entity['~entity'].name).toBe('Simple')
	})
})
