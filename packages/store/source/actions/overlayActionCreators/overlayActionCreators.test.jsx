import * as React from "react";
import { default as configureStore } from "redux-mock-store";
import { ActionType } from "../actions";
import { createOverlay, deleteOverlay } from "./overlayActionCreators";


const middlewares = [];
const mockStore = configureStore(middlewares);


test("Should Create Overlay", () => {
  const children = <div>boo</div>;
  const id = "overlay-1";

  const store = mockStore({});
  store.dispatch(createOverlay(id, children));

  const expectedPayload = {
    payload: { children, id },
    type: ActionType.CREATE_OVERLAY,
  };

  const actions = store.getActions();
  expect(actions).toEqual([ expectedPayload ]);
});

test("Should Delete Overlay", () => {
  const id = "overlay-1";

  const store = mockStore({});
  store.dispatch(deleteOverlay(id));

  const expectedPayload = {
    payload: { id },
    type: ActionType.DELETE_OVERLAY,
  };

  const actions = store.getActions();
  expect(actions).toEqual([ expectedPayload ]);
});
