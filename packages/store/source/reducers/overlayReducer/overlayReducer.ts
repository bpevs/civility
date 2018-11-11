import { ActionType, CreateOverlay, DeleteOverlay } from "../../actions/actions"
import { createReducer } from "../reducer"


export interface IOverlaysState {
  [id: string]: any
}

const initialState: IOverlaysState = {}

export const overlayReducer = createReducer(initialState, {
  [ActionType.CREATE_OVERLAY]: createOverlay,
  [ActionType.DELETE_OVERLAY]: deleteOverlay,
})


function createOverlay(
  state: IOverlaysState,
  action: CreateOverlay,
): IOverlaysState {
  const { id, children } = action.payload
  const nextState = { ...state }
  nextState[id] = children
  return nextState
}

function deleteOverlay(
  state: IOverlaysState,
  action: DeleteOverlay,
): IOverlaysState {
  const { id } = action.payload
  const nextState = { ...state }
  delete nextState[id]
  return nextState
}
