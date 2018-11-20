import { isAction } from "./actions"

test("Should be true for objects that are actions", () => {
  isAction({ type: "hello" })
})

test("Should be false for things that are not actions", () => {
  isAction("hello")
  isAction({})
  isAction({ type: null })
  isAction({ type: {} })
})
