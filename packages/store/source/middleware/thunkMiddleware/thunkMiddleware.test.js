// https://github.com/gaearon/redux-thunk/blob/master/test/index.js

import { isFunction, noop } from "lodash-es";
import { IAction } from "../../actions/Action";
import { thunkMiddleware } from "./thunkMiddleware";

const doDispatch = noop;
const doGetState = noop;
let nextHandler = thunkMiddleware({ dispatch: doDispatch, getState: doGetState });
beforeEach(() => {
  nextHandler = thunkMiddleware({ dispatch: doDispatch, getState: doGetState });
});

test("must return a function to handle next", () => {
  expect(isFunction(nextHandler)).toBe(true);
  // expect(nextHandler.length).toBe(1);
});

describe("handle next", () => {
  test("must return a function to handle action", () => {
    const actionHandler = nextHandler();
    expect(isFunction(actionHandler)).toBe(true);
    // expect(actionHandler.length).toBe(1);
  });

  describe("handle action", () => {
    test("must run the given action function with dispatch and getState", done => {
      const actionHandler = nextHandler();

      actionHandler((dispatch, getState) => {
        expect(dispatch).toBe(doDispatch);
        expect(getState).toBe(doGetState);
        done();
      });
    });

    test("must pass action to next if not a function", done => {
      const actionObj: IAction<any> = { payload: {}, type: undefined };

      const actionHandler = nextHandler(action => {
        expect(action).toBe(actionObj);
        done();
      });

      actionHandler(actionObj);
    });

    test("must return the return value of next if not a function", () => {
      const expected: IAction<any> = { payload: {}, type: undefined };
      const actionHandler = nextHandler(() => expected);

      const outcome = actionHandler();
      expect(outcome).toBe(expected);
    });

    test("must return value as expected if a function", () => {
      const expected = "rocks";
      const actionHandler = nextHandler();

      const outcome = actionHandler(() => expected);
      expect(outcome).toBe(expected);
    });

    test("must be invoked synchronously if a function", () => {
      const actionHandler = nextHandler();
      let mutated = 0;

      actionHandler(() => mutated++);
      expect(mutated).toBe(1);
    });
  });
});

describe("handle errors", () => {
  test("must throw if argument is non-object", done => {
    try {
      thunkMiddleware();
    } catch (err) {
      done();
    }
  });
});
