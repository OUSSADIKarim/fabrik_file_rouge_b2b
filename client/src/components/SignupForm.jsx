import { Input, Button } from "@teovilla/shadcn-ui-react"
import { useRegister } from "../hooks/useRegister"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Error from "./Error"
import Loading from "./Loading"

const SignupForm = () => {
  const [company, setCompany] = useState({
    name: "",
    nrc: "",
    nif: "",
    email: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { mutate: register, isLoading } = useRegister(company)
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    setErrorMessage("")
    register(company, {
      onSuccess: () => {
        navigate("/loggin")
      },
      onError: (err) => {
        setErrorMessage(err.response.data.message)
      },
    })
  }

  return (
    <>
      {isLoading && (
        <Loading className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
      )}

      {errorMessage && <Error errorMessage={errorMessage} />}

      <form className="w-full flex flex-col items-center justify-center gap-4">
        <Input
          id="name"
          type="text"
          placeholder="Company Name"
          className="w-1/3"
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
        />
        <Input
          id="nrc"
          type="text"
          placeholder="nrc"
          className="w-1/3"
          onChange={(e) => setCompany({ ...company, nrc: e.target.value })}
        />
        <Input
          id="nif"
          type="text"
          placeholder="nif"
          className="w-1/3"
          onChange={(e) => setCompany({ ...company, nif: e.target.value })}
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="w-1/3"
          onChange={(e) => setCompany({ ...company, email: e.target.value })}
        />
        <Input
          id="password"
          type="password"
          placeholder="password"
          className="w-1/3"
          onChange={(e) => setCompany({ ...company, password: e.target.value })}
        />
        <Button onClick={handleSignup}>Signup</Button>
      </form>
    </>
  )
}

export default SignupForm
