import { promisify } from "./promisify";

let nodeMethod = null;
let callback = null;
let data = null;
let error = null;

beforeEach(() => {
  data = error = callback = null;
  nodeMethod = jest.fn(cb => {
    callback = jest.fn(cb);
    setTimeout(() => callback(error, data), 20);
  });
});

test("Should correctly handle a single response", () => {
  const nodePromise = promisify(nodeMethod);
  data = "data";

  return nodePromise().then(d => {
    expect(d).toEqual("data");
    expect(nodeMethod.mock.calls.length).toBe(1);
    expect(callback.mock.calls.length).toBe(1);
  });
});

test("Should correctly handle errors", () => {
  const nodePromise = promisify(nodeMethod);
  const myError = new Error("My Error");
  error = myError;
  data = "data";

  return nodePromise().then(
    d => Promise.reject(new Error("Promise should not succeed!")),
    e => {
      expect(e).toBeDefined();
      expect(e).toEqual(myError);
      expect(nodeMethod.mock.calls.length).toEqual(1);
      expect(callback.mock.calls.length).toEqual(1);
    }
  );
});

test("Should handle multiple arguments", () => {
  data = "data";
  error = null;
  nodeMethod = jest.fn((arg1, arg2, arg3, cb) => {
    callback = jest.fn(cb);
    setTimeout(() => callback(error, data), 20);
  });

  const nodePromise = promisify(nodeMethod);
  const args = [1, 2, 3];

  return nodePromise.apply(this, args)
    .then(d => {
      expect(d).toEqual(data);
      expect(nodeMethod.mock.calls.length).toEqual(1);
      const nodeMethodArgs = nodeMethod.mock.calls[0];
      expect(nodeMethodArgs[0]).toEqual(args[0]);
      expect(nodeMethodArgs[1]).toEqual(args[1]);
      expect(nodeMethodArgs[2]).toEqual(args[2]);

      expect(callback.mock.calls.length).toEqual(1);
      const callbackArgs = callback.mock.calls[0];
      expect(callbackArgs[0]).toBeNull();
      expect(callbackArgs[1]).toEqual(data);
    });
});
