import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@teovilla/shadcn-ui-react"
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import Loading from "./Loading"
import Error from "./Error"
import useLogState from "../hooks/useLogState"
import { useNavigate } from "react-router-dom"
import useAccessTokenState from "../hooks/useAccessTokenState"

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    userType: "company",
    email: "",
    password: "",
  })
  const { setLogState } = useLogState()
  const { setAccessToken } = useAccessTokenState()
  const [errorMessage, setErrorMessage] = useState("")
  const { mutate: login, isLoading } = useLogin(credentials)
  const navigate = useNavigate()

  const handleLoggin = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    login(credentials, {
      onSuccess: (data) => {
        setLogState(true)
        setAccessToken(data.accessToken)
        navigate("/")
      },
      onError: (err) => {
        setErrorMessage(err.response.data)
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
        <Select
          value={credentials.userType}
          onChange={(e) =>
            setCredentials({ ...credentials, userType: e.target.value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Are you ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>User Type</SelectLabel>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="w-1/3"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <Input
          id="password"
          type="password"
          placeholder="password"
          className="w-1/3"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button onClick={handleLoggin}>Loggin</Button>
      </form>
    </>
  )
}

export default LoginForm
