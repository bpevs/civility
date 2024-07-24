import { render } from "solid-js/web"
import { Component, createSignal, Show } from "solid-js";
import { spring } from "motion";
import { Motion, Presence } from "@motion/solid";

const App: Component = () => {
  const [toggle, setToggle] = createSignal(true);
  return (
    <div class="container">
      <button onClick={() => setToggle(!toggle())}>
        Toggle
      </button>
      <Presence exitBeforeEnter>
        <Show when={toggle()}>
          <Motion.div
            class="box"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
          />
        </Show>
      </Presence>
    </div>
  );
};

console.log("Starting to render Solid.js app...")
render(() => <App />, document.body)
