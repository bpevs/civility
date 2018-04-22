export type AnyFunc = (...args: any[]) => any;

export interface IAction<ActionType> {
  readonly type: ActionType;
}

export interface IApiAction<PayloadType> {
  readonly callAPI?: (...args: any[]) => PromiseLike<any>;
  readonly payload: PayloadType;
  readonly shouldCallAPI?: (...args: any[]) => boolean;
  readonly types: [ ActionType, ActionType, ActionType ];
}

export type IAsyncAction<PayloadType> = IApiAction<PayloadType> | AnyFunc;

export type ActionCreator = (...args: any[]) => ActionTypes;


// ACTION TYPES
// ––––––––––––
import {
  CreateOverlay,
  DeleteOverlay,
} from "./overlayActionCreators/overlayActionCreators";

export enum ActionType {
  CREATE_OVERLAY = "CREATE_OVERLAY",
  DELETE_OVERLAY = "DELETE_OVERLAY",
  OTHER = "__any_other_action_type__",
}

export type ActionTypes =
  | CreateOverlay
  | DeleteOverlay
  | IAction<ActionType.OTHER>;
