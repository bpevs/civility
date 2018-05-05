import { filter } from "./filter";


describe("filter", () => {
  test("Should return a new array", () => {
    const values = [ 1, 2 ];
    const filtered = filter(values, val => val)
    expect(filtered).toEqual(values)
    expect(filtered === values).toBe(false)
  })

  test("Should filter out falsy values", () => {
    const values = [ 0, 1, 2 ]
    const filtered = filter(values, val => val)
    expect(filtered).toEqual([ 1, 2 ])
  })
})
