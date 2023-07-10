import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@teovilla/shadcn-ui-react"
import { useState } from "react"
import useLogState from "../../hooks/contexts/useLogState"
import { useNavigate } from "react-router-dom"
import useAccessTokenState from "../../hooks/contexts/useAccessTokenState"
import { useLogin } from "../../hooks/apis/auth/useLogin"
import { useErrorBoundary } from "react-error-boundary"

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    userType: "",
    email: "",
    password: "",
  })
  const { setLogState, setUser } = useLogState()
  const { setAccessToken } = useAccessTokenState()
  const { mutate: login } = useLogin(credentials)
  const { showBoundary } = useErrorBoundary()
  const navigate = useNavigate()

  const handleLoggin = async (e) => {
    e.preventDefault()
    login(credentials, {
      onSuccess: (data) => {
        setLogState(true)
        localStorage.user = JSON.stringify(data.company)
        setUser(data.company)
        setAccessToken(data.accessToken)
        navigate("/feed")
      },
      onError: (err) => {
        showBoundary(err)
      },
    })
  }

  return (
    <form className="space-y-10">
      <div className="flex justify-center mt-10">
        <Select
          onValueChange={(value) => {
            setCredentials({ ...credentials, userType: value })
          }}
        >
          <SelectTrigger className="w-ful border-primary dark:border-primary focus:ring-primary dark:focus:ring-primary">
            <SelectValue placeholder="Are you ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="dark:bg-tertiary">
              <SelectLabel className="text-primary dark:text-primary">
                Are you ...
              </SelectLabel>
              <SelectItem
                className="focus:bg-primary dark:focus:bg-primary dark:text-secondary"
                value="company"
              >
                Company
              </SelectItem>
              <SelectItem
                className="focus:bg-primary dark:focus:bg-primary dark:text-secondary"
                value="employee"
              >
                Employee
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="font-medium">Email</Label>
        <Input
          type="email"
          required
          className="w-full mt-2 px-3 py-2 text-secondary dark:text-tertiary bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </div>
      <div>
        <Label className="font-medium">Password</Label>
        <Input
          type="password"
          required
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 mt-2 rounded-md"
          onClick={handleLoggin}
        >
          Log in
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
