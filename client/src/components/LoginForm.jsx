import { Button, Input } from "@teovilla/shadcn-ui-react"
import { useState } from "react"

const LoginForm = () => {
  const [company, setCompany] = useState({
    name: "",
    nrc: "",
    nif: "",
    email: "",
    password: "",
  })

  const handleLoggin = async (e) => {
    e.preventDefault()
  }
  return (
    <>
      <form className="w-full flex flex-col items-center justify-center gap-4">
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
        <Button onClick={handleLoggin}>Loggin</Button>
      </form>
    </>
  )
}

export default LoginForm
