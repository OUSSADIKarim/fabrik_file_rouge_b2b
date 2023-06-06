import { Input, Textarea, Button } from "@teovilla/shadcn-ui-react"

const SignupForm = () => {
  const handleSignup = (e) => {
    e.preventDefault()
  }

  return (
    <form className="w-full flex items-center justify-center">
      <Input
        id="name"
        type="text"
        placeholder="Company Name"
        className="w-1/2"
      />
      <Input id="nrc" type="text" placeholder="nrc" className="w-1/2" />
      <Input id="nif" type="text" placeholder="nif" className="w-1/2" />
      <Input id="email" type="email" placeholder="Email" className="w-1/2" />
      <Input
        id="password"
        type="password"
        placeholder="password"
        className="w-1/2"
      />
      <Button onClick={handleSignup}>Signup</Button>
    </form>
  )
}

export default SignupForm
