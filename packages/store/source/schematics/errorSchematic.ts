import { createArrayReducers } from "../reducers/createArrayReducers"
import { ISchematic } from "./schematics"
const reducers = createArrayReducers("errors")

export const errorLayout: ISchematic = {
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
