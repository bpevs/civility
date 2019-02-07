import { Func } from "@civility/utilities"
import * as React from "react"
import { Input } from "../Input/Input"


const heading: { [type: string]: string } = {
  signIn: "Sign In",
  signUp: "Sign Up",
}

const passwordPlaceholder: { [type: string]: string } = {
  signIn: "Enter Password",
  signUp: "Choose Password",
}

const usernamePlaceholder: { [type: string]: string } = {
  signUp: "Choose username",
}


export type SigninFormProps = React.HTMLProps<HTMLFormElement> & {
  dispatch: Func,
  type?: "signIn" | "signUp",
}


export const SigninForm: React.FC<SigninFormProps> = function SigninForm({
  dispatch,
  type = "signIn", // Are we signing in or signing up?
}) {
  const [ email, setEmail ] = React.useState("")
  const [ username, setUsername ] = React.useState("")
  const [ password, setPassword ] = React.useState("")
  const [ signinType, setType ] = React.useState(type)

  const onSubmit = async (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!email || !password) return
    if (signinType !== "signIn" && signinType !== "signUp") return

    if (signinType === "signIn") await dispatch({
      payload: { email, password },
      type: "updateAuthState",
    })

    if (signinType === "signUp") await dispatch({
      payload: { email, password, username },
      type: "createUser",
    })

    location.assign("/")
  }

  return (
    <form onSubmit={onSubmit} className="sm-col-6 mx-auto">
      <h2>{heading[signinType]}</h2>
      <Input
        className="block col-12 field h4"
        onChange={(evt: any) => setEmail(evt.target.value)}
        name="email" type="email" label="Email"
        placeholder="Enter email"
        value={email} />

      {
        signinType === "signUp"
          ? <Input
            className="block col-12 field h4"
            onChange={(evt: any) => setUsername(evt.target.value)}
            name="username" type="username" label="Username"
            placeholder={usernamePlaceholder[signinType]}
            disabled={!usernamePlaceholder[signinType]}
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
        children={heading[signinType]}
        className="btn btn-primary bold h4 inline-block mt2"
        disabled={!passwordPlaceholder[signinType]}
      />

      <button
        children={signinType === "signIn" ? "Sign Up" : "Sign In"}
        className="btn link h4 inline-block mt2 ml2"
        onClick={evt => {
          evt.preventDefault()
          setType(signinType === "signIn" ? "signUp" : "signIn")
        }} />
    </form>
  )
}
