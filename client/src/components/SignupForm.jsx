import { Input, Button, Label } from "@teovilla/shadcn-ui-react"
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
        navigate("/login")
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

      <form className="space-y-3">
        <div>
          <Label className="font-medium">Company Name</Label>
          <Input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-secondary dark:text-tertiary bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
          />
        </div>
        <div>
          <Label className="font-medium">Commercial Register Number</Label>
          <Input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-secondary dark:text-tertiary bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
            onChange={(e) => setCompany({ ...company, nrc: e.target.value })}
          />
        </div>
        <div>
          <Label className="font-medium">Tax ID Number</Label>
          <Input
            type="text"
            required
            className="w-full mt-2 px-3 py-2 text-secondary dark:text-tertiary bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
            onChange={(e) => setCompany({ ...company, nif: e.target.value })}
          />
        </div>
        <div>
          <Label className="font-medium">Email</Label>
          <Input
            type="email"
            required
            className="w-full mt-2 px-3 py-2 text-secondary dark:text-tertiary bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
          />
        </div>
        <div>
          <Label className="font-medium">Password</Label>
          <Input
            type="password"
            required
            onChange={(e) =>
              setCompany({ ...company, password: e.target.value })
            }
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 rounded-md"
            onClick={handleSignup}
          >
            Create Account
          </Button>
        </div>
      </form>
    </>
  )
}

export default SignupForm
