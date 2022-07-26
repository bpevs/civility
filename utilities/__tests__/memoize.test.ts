import { assertEquals } from 'std/asserts';

import { memoize } from '../memoize.ts';

const map = (obj: { [name: string]: number }) => {
  return Object.keys(obj).map((key) => obj[key]);
};

Deno.test('Should memoize stuff', () => {
  const object = { a: 1, b: 2 };
  const other = { c: 3, d: 4 };

  const memoMap = memoize(map);

  assertEquals(memoMap(object), [1, 2]);
  assertEquals(memoMap(other), [3, 4]);

  object.a = 2;
  assertEquals(memoMap(object), [1, 2]);
});
