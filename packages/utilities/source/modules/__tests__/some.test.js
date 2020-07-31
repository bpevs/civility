import { some } from "../some"

describe("some", () => {
  test("Should return true if all predicates pass", () => {
    const values = [ 3, 3, 3, 3 ]
    const result = some(values, val => val === 3)
    expect(result).toBe(true)
  })

  test("Should return true if passes any predicate", () => {
    const values = [ 2, 5, 3, 1 ]
    const result = some(values, val => val === 3)
    expect(result).toBe(true)
  })

  test("Should return true if all predicates fail", () => {
    const values = [ 2, 4, 1, true ]
    const result = some(values, val => val === 3)
    expect(result).toBe(false)
  })
})
