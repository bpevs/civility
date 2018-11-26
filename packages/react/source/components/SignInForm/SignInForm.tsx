import { Func } from "@civility/utilities"
import React, { ChangeEvent, useState } from "react"
import { Input } from "../Input/Input"


const heading = {
  signIn: "Sign In",
  signUp: "Sign Up",
}

const passwordPlaceholder = {
  signIn: "Enter Password",
  signUp: "Choose Password",
}

const usernamePlaceholder = {
  signUp: "Choose username",
}


export type SigninFormProps = React.HTMLProps<HTMLFormElement> & {
  dispatch: Func,
  signinType: "signIn" | "signUp",
}


export const SigninForm: React.FC<SigninFormProps> = ({
  dispatch,
  signinType = "signIn", // Are we signing in or signing up?
}) => {
  const [ email, setEmail ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ type, setSigninType ] = useState(signinType)

  const onSubmit = async (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!email || !password) return
    if (type !== "signIn" && type !== "signUp") return

    if (type === "signIn") await dispatch({
      payload: { email, password },
      type: "updateAuthState",
    })

    if (type === "signUp") await dispatch({
      payload: { email, password, username },
      type: "createUser",
    })

    location.assign("/")
  }

  return (
    <form onSubmit={onSubmit} className="sm-col-6 mx-auto">
      <h2>{heading[type]}</h2>
      <Input
        className="block col-12 field h4"
        onChange={(evt: any) => setEmail(evt.target.value)}
        name="email" type="email" label="Email"
        placeholder="Enter email"
        value={email} />

      {
        type === "signUp"
          ? <Input
            className="block col-12 field h4"
            onChange={(evt: any) => setUsername(evt.target.value)}
            name="username" type="username" label="Username"
            placeholder={usernamePlaceholder[type]}
            disabled={!usernamePlaceholder[type]}
            value={username} />
          : ""
      }

      <Input
        className="block col-12 field h4"
        onChange={(evt: any) => setPassword(evt.target.value)}
        name="password" type="password" label="Password"
        placeholder={passwordPlaceholder[signinType]}
        disabled={!passwordPlaceholder[signinType]}
        value={password} />

      <button
        children={heading[type]}
        className="btn btn-primary bold h4 inline-block mt2"
        disabled={!passwordPlaceholder[signinType]}
      />

      <button
        children={type === "signIn" ? "Sign Up" : "Sign In"}
        className="btn link h4 inline-block mt2 ml2"
        onClick={evt => {
          evt.preventDefault()
          setSigninType(type === "signIn" ? "signUp" : "signIn")
        }} />
    </form>
  )
}
