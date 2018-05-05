export type AnyFunc = (...args: any[]) => any;

export interface IAction<ActionType> {
  readonly type: ActionType;
  readonly [key: string]: any;
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
import * as actionCreators from "./actionCreators";
export * from "./actionCreators";

export enum ActionType {
  CREATE_OVERLAY = "CREATE_OVERLAY",
  DELETE_OVERLAY = "DELETE_OVERLAY",
  OTHER = "__any_other_action_type__",
}

export type ActionTypes =
  | actionCreators.CreateOverlay
  | actionCreators.DeleteOverlay
  | IAction<ActionType.OTHER>;
