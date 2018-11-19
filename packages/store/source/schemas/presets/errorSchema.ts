import { createArrayReducerMap } from "../../reducerMapCreators/reducerMapCreators"
import { createSchema, ISchema } from "../createSchema/createSchema"


const reducerMap = createArrayReducerMap()

export const errorSchema: ISchema = createSchema(reducerMap, {
  pushError: {
    method: "push",
  },

  popError: {
    method: "pop",
  },
})
