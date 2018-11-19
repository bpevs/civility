import { createMapReducerMap } from "../../reducerMapCreators/reducerMapCreators"
import { createSchema, ISchema } from "../createSchema/createSchema"


const reducers = createMapReducerMap("uid")

export const userSchema: ISchema = createSchema(reducers, {
  deleteUser: {
    async: true,
    method: "delete",
  },

  getUser: {
    async: true,
    method: "create",
  },

  postUser: {
    async: true,
    method: "create",
  },

  putUser: {
    async: true,
    method: "update",
  },

  signIn: {
    async: true,
    method: "update",
  },

  signOut: {
    async: true,
    method: "update",
  },
})
