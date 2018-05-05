import { map } from "./map";

describe("map", () => {
  test("Should return a new array", () => {
    const values = [ 1, 2 ];
    const mapped = map(values, val => val)
    expect(mapped).toEqual(values)
    expect(mapped === values).toBe(false)
  })

  test("Should map to new values", () => {
    const values = [ 0, 1, 2 ]
    const mapped = map(values, val => ++val)
    expect(mapped).toEqual([ 1, 2, 3 ])
  })
})
