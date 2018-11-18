import { isNil, isString } from "@civility/utilities"
import { createMapReducers } from "../reducerCreators/createMapReducers"
import { ISchema } from "./schema"

const name = "overlays"
const keyBy = "id"
const reducers = createMapReducers(name, keyBy)

export const overlaySchema: ISchema = {
  createOverlay: {
    reducer: reducers.create,
    request: {
      children: (a: any) => !isNil(a),
      id: isString,
    },
  },

  deleteOverlay: {
    reducer: reducers.delete,
    response: {
      children: (a: any) => a,
      id: String,
    },
  },
}
