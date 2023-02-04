import { assertStrictEquals } from '$std/testing/asserts.ts'
import { describe } from '$std/testing/bdd.ts'
import { classNames as cx } from '../class_names.ts'

Deno.test('Should export a function', () => {
  assertStrictEquals(typeof cx, 'function')
})

Deno.test('Joins all arguments together as a string', () => {
  assertStrictEquals(cx('hello', 'my', 1, 'class'), 'hello my 1 class')
})

Deno.test('Ignores items that are not strings or numbers', () => {
  assertStrictEquals(
    cx('hello my   ', null, 1, 'class'),
    'hello my    1 class',
  )
})

describe('Arrays', () => {
  Deno.test('Joins each item together into a string', () => {
    assertStrictEquals(cx(['hello', 'my', 1, 'class']), 'hello my 1 class')
  })

  Deno.test('Ignores falsy values', () => {
    assertStrictEquals(cx(['hello my', null, 1, 'class']), 'hello my 1 class')
  })

  Deno.test('Joins values of nested arrays into a string', () => {
    assertStrictEquals(
      cx([['hello my', null], [1, 'class'], [null]]),
      'hello my 1 class',
    )
  })
})

describe('Objects', () => {
  Deno.test('Joins each object key that has a truthy value', () => {
    const className = cx({
      hello: false,
      my: true,
      lalala: false,
      className: true,
    })

    assertStrictEquals(className, 'my className')
  })

  Deno.test('Objects can be nested in Arrays', () => {
    const className = cx(['helloagain', {
      hello: false,
      my: true,
      lalala: false,
      className: true,
    }])

    assertStrictEquals(className, 'helloagain my className')
  })
})
