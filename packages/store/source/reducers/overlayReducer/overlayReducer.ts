import { clone } from "lodash-es";
import { ActionType, CreateOverlay, DeleteOverlay } from "../../actions/actions";
import { createReducer } from "../reducer";


export interface IOverlaysState {
  byId: { [id: string]: any };
}

const initialState: IOverlaysState = {
  byId: {},
};


export const overlayReducer = createReducer(initialState, {
  [ActionType.CREATE_OVERLAY]: createOverlay,
  [ActionType.DELETE_OVERLAY]: deleteOverlay,
});


function createOverlay(
  state: IOverlaysState,
  action: CreateOverlay,
): IOverlaysState {
  const { id, children } = action.payload;
  const nextState = clone(state);
  nextState.byId[id] = children;
  return nextState;
}

function deleteOverlay(
  state: IOverlaysState,
  action: DeleteOverlay,
): IOverlaysState {
  const { id } = action.payload;
  const nextState = clone(state);
  delete nextState.byId[id];
  return nextState;
}
