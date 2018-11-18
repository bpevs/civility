import { createArrayReducers } from "../reducerCreators/createArrayReducers"
import { ISchema } from "./schema"
const reducers = createArrayReducers()

export const errorSchema: ISchema = {
  pushError: {
    async: false,
    reducer: reducers.push,
    request: {
      error: () => true,
    },
  },

  popError: {
    async: false,
    reducer: reducers.pop,
    response: {
      errorMessage: String,
    },
  },
}
