import { debounce } from "./debounce"


beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

test("Should return a function", () => {
  expect(typeof debounce(jest.fn(), 100)).toBe("function")
})

test("Should delay function by timer", () => {
  jest.useFakeTimers()
  const toBounce = jest.fn()

  const bounce = debounce(toBounce, 100)
  bounce()

  jest.advanceTimersByTime(50)
  expect(toBounce).toBeCalledTimes(0)
  jest.advanceTimersByTime(100)
  expect(toBounce).toBeCalledTimes(1)
})

test("Should run function once if called again before timer elapsed", () => {
  jest.useFakeTimers()
  const toBounce = jest.fn()

  const bounce = debounce(toBounce, 100)
  bounce()
  jest.advanceTimersByTime(80)
  bounce()
  jest.advanceTimersByTime(80)
  bounce()
  jest.advanceTimersByTime(110)
  bounce()
  jest.advanceTimersByTime(110)
  expect(toBounce).toBeCalledTimes(2)
})
