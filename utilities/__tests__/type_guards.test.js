import { assertSnapshot } from '$std/testing/snapshot.ts'
import * as typeGuards from '../type_guards.ts'

const items = [
  's',
  0,
  1,
  '1',
  Infinity,
  null,
  undefined,
  [],
  [1],
  {},
  { 0: 1, 1: 2 },
  Number,
  new RegExp(/fsdf/),
  /fsdf/,
  1.5234,
  Math.pow(2, 53),
  new Error('hello'),
  NaN,
  Date.UTC(1, 1, 1),
  Promise.resolve(),
  new Set(),
  new Map(),
  '/myurlorsomething',
  '/myregex/aa',
  '/myregex/',
]

Object.keys(typeGuards).forEach((checkName) => {
  const check = typeGuards[checkName]
  try {
    Deno.test(check.name, async (t) => {
      await Promise.all(items.map((item) => {
        return assertSnapshot(t, `${check.name}(${item}): ${check(item)}`)
      }))
    })
  } catch (e) {
    console.error(e)
  }
})
