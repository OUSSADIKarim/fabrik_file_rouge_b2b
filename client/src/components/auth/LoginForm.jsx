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
import Loading from "../Loading"
import Error from "../Error"
import useLogState from "../../hooks/contexts/useLogState"
import { useNavigate } from "react-router-dom"
import useAccessTokenState from "../../hooks/contexts/useAccessTokenState"
import { useLogin } from "../../hooks/apis/auth/useLogin"

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    userType: "",
    email: "",
    password: "",
  })
  const { setLogState, setUser } = useLogState()
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
        localStorage.user = data.company.companyId
        setUser(data.company.companyId)
        setAccessToken(data.accessToken)
        navigate("/feed")
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

      {/* <form className="w-full flex flex-col items-center justify-center gap-4">
        <Select
          onValueChange={(value) => {
            setCredentials({ ...credentials, userType: value })
          }}
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
        <Button
          className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 mt-2 rounded-md"
          onClick={handleLoggin}
        >
          Log in
        </Button>
      </form> */}
    </>
  )
}

export default LoginForm
