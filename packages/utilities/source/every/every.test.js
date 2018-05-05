import { every } from "./every";


describe("every", () => {
  test("Should return false if fails predicate", () => {
    const values = [ 3, 3, 2, 4 ];
    const result = every(values, val => val === 3)
    expect(result).toBe(false)
  })

  test("Should return true if all pass", () => {
    const values = [ 3, 3, 3, 3 ];
    const result = every(values, val => val === 3)
    expect(result).toBe(true)
  })
})
