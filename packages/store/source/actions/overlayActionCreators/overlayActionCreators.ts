import { ActionType, IAction } from "../actions";


// ACTIONS
// –––––––
export interface CreateOverlay extends IAction<ActionType.CREATE_OVERLAY> {
  readonly payload: {
    readonly id: string;
    readonly children: any;
  };
}

export interface DeleteOverlay extends IAction<ActionType.DELETE_OVERLAY> {
  readonly payload: {
    readonly id: string;
  };
}


// ACTION CREATORS
// –––––––––––––––
export function createOverlay(id: string, children: any): CreateOverlay {
  return {
    payload: { id, children },
    type: ActionType.CREATE_OVERLAY,
  };
}

export function deleteOverlay(id: string): DeleteOverlay {
  return {
    payload: { id },
    type: ActionType.DELETE_OVERLAY,
  };
}
