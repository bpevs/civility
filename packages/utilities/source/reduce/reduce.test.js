import { reduce } from "./reduce";

describe("reduce", () => {
  test("Should reduce arrays", () => {
    const values = [ 1, 2, 3, 4, 5 ];
    const reduced = reduce(values, (prev, val) => prev + val)
    expect(reduced).toEqual(15)
  })

  test("Should reduce objects", () => {
    const values = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };
    const reduced = reduce(values, (prev, val) => prev + val)
    expect(reduced).toEqual(15)
  })

  test("Should accept initial value", () => {
    const values = [ 1, 2, 3, 4, 5 ];
    const reduced = reduce(values, (prev, val) => prev + val, 1)
    expect(reduced).toEqual(16)
  })
})
