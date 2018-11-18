import { isString } from "@civility/utilities"
import { createMapReducers } from "../reducerCreators/createMapReducers";
import { ISchema } from "./schema"

const name = "users"
const keyBy = "uid"
const reducers = createMapReducers(name, keyBy)

export const userSchema: ISchema = {
  deleteUser: {
    async: true,
    reducer: reducers.delete,
    request: {
      uid: isString,
    },
    response: {
      uid: isString,
    },
  },

  getUser: {
    async: true,
    reducer: reducers.create,
    request: {
      uid: isString,
    },
    response: {
      email: String,
      password: String,
      username: String,
    },
  },


  postUser: {
    async: true,
    reducer: reducers.create,
    request: {
      email: isString,
      password: isString,
      username: isString,
    },
    response: {
      uid: String,
    },
  },

  putUser: {
    async: true,
    reducer: reducers.update,
    request: {
      email: isString,
      password: isString,
      username: isString,
    },
    response: {
      uid: String,
    },
  },

  signIn: {
    async: true,
    reducer: reducers.update,
    request: {
      email: isString,
      password: isString,
      username: isString,
    },
    response: {
      uid: String,
    },
  },

  signOut: {
    async: true,
    reducer: reducers.update,
    request: {},
    response: {
      uid: String,
    },
  },
}
