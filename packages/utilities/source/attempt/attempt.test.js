import { attempt } from "./attempt"

test("Should run a function", () => {
  const toRun = jest.fn()
  attempt(toRun)
  expect(toRun).toBeCalledTimes(1)
})

test("Should run with args", () => {
  const toRun = jest.fn()
  attempt(toRun, 1, 2, 3)
  expect(toRun).toBeCalledWith(1, 2, 3)
})

test("Should return errors", () => {
  const toRun = jest.fn(() => {
    throw new Error("I DIED")
  })

  const result = attempt(toRun, 1, 2, 3)
  expect(result instanceof Error).toBe(true)
})
