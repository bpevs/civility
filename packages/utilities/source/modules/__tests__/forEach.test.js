import { forEach } from "../forEach"


describe("forEach", () => {
  test("Should iterate over Arrays", () => {
    const fn = jest.fn()
    forEach([ "0", "1", "2" ], fn)

    const [ zero, one, two ] = fn.mock.calls
    expect(zero[ 0 ]).toBe("0")
    expect(zero[ 1 ]).toBe(0)

    expect(one[ 0 ]).toBe("1")
    expect(one[ 1 ]).toBe(1)

    expect(two[ 0 ]).toBe("2")
    expect(two[ 1 ]).toBe(2)
  })


  test("Should iterate over Objects", () => {
    const fn = jest.fn()

    forEach({
      zero: "0",
      one: "1",
      two: "2",
    }, fn)

    expect(fn).toBeCalledWith("0", "zero")
    expect(fn).toBeCalledWith("1", "one")
    expect(fn).toBeCalledWith("2", "two")
  })

  test("Should iterate exactly once", () => {
    const fn1 = jest.fn()
    const fn2 = jest.fn()
    forEach([ 1, 2, 3 ], fn1)
    forEach({ 1: 1, 2: 2, 3: 3 }, fn2)
    expect(fn1.mock.calls.length).toBe(3)
    expect(fn2.mock.calls.length).toBe(3)
  })

  test("Should not iterate over inherited properties", () => {
    const fn1 = jest.fn()
    const triangle = { a: 1, b: 2, c: 3 }

    function ColoredTriangle() {
      this.color = "red"
    }

    ColoredTriangle.prototype = triangle

    const obj = new ColoredTriangle()

    forEach(obj, fn1)
    expect(fn1.mock.calls[ 0 ][ 0 ]).toBe("red")
    expect(fn1.mock.calls[ 0 ][ 1 ]).toBe("color")
  })
})
