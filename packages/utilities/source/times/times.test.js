import { times } from "./times"

test("Should run a function mutliple times", () => {
  expect(times(3, String)).toEqual([ "0", "1", "2" ])
})
