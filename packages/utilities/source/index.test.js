import * as utilities from "./index";

test("Exports classNames", () => {
  expect(typeof utilities.classNames).toBe("function");
});
