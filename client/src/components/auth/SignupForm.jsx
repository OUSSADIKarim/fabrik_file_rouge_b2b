import { Input, Button, Label } from "@teovilla/shadcn-ui-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRegister } from "../../hooks/apis/auth/useRegister"
import { useErrorBoundary } from "react-error-boundary"

const SignupForm = () => {
  const [company, setCompany] = useState({
    name: "",
    nrc: "",
    nif: "",
    email: "",
    password: "",
  })
  const { showBoundary } = useErrorBoundary()
  const { mutate: register } = useRegister(company)
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    register(company, {
      onSuccess: () => {
        navigate("/login")
      },
      onError: (err) => {
        showBoundary(err)
      },
    })
  }

  return (
    <form className="space-y-3">
      <div>
        <Label className="font-medium">Company Name</Label>
        <Input
          type="text"
          required
          className="w-full mt-2 px-3 py-2 text-secondary dark:text-tertiary bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
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
          onChange={(e) => setCompany({ ...company, password: e.target.value })}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-primary dark:border-primary focus:border-primary dark:focus:border-primary focus:ring-primary dark:focus:ring-primary shadow-sm rounded-lg"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 mt-2 rounded-md"
          onClick={handleSignup}
        >
          Create Account
        </Button>
      </div>
    </form>
  )
}

export default SignupForm
