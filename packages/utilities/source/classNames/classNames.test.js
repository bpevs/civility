import { classNames as cx } from "./classNames";


test("Should export a function", () => {
  expect(typeof cx).toBe("function");
});

test("Joins all arguments together as a string", () => {
  expect(cx("hello", "my", 1, "class")).toBe("hello my 1 class");
});

test("Ignores items that are not strings or numbers", () => {
  expect(cx("hello my   ", null, 1, "class")).toBe("hello my    1 class");
});


describe("Arrays", () => {
  test("Joins each item together into a string", () => {
    expect(cx([ "hello", "my", 1, "class" ])).toBe("hello my 1 class");
  });

  test("Ignores falsy values", () => {
    expect(cx([ "hello my", null, 1, "class" ])).toBe("hello my 1 class");
  });

  test("Joins values of nested arrays into a string", () => {
    expect(cx([ [ "hello my", null ], [ 1, "class" ], [ null ] ])).toBe("hello my 1 class");
  })
});


describe("Objects", () => {
  test("Joins each object key that has a truthy value", () => {
    const className = cx({
      hello: null,
      my: true,
      lalala: false,
      className: true,
    });

    expect(className).toBe("my className");
  });

  test("Objects can be nested in Arrays", () => {
    const className = cx([ "helloagain", {
      hello: null,
      my: true,
      lalala: false,
      className: true,
    } ]);

    expect(className).toBe("helloagain my className");
  })
});
