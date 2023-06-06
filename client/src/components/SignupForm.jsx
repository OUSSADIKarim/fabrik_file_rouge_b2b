import { Input, Textarea, Button } from "@teovilla/shadcn-ui-react"

const SignupForm = () => {
  const handleSignup = (e) => {
    e.preventDefault()
  }

  return (
    <form className="w-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Input id="email" type="email" placeholder="Email" className="w-1/2" />
        <Input
          id="name"
          type="text"
          placeholder="Company Name"
          className="w-1/2"
        />
        <Input
          id="companySize"
          type="text"
          placeholder="Company Size"
          className="w-1/2"
        />
        <Input
          id="employeesNumber"
          type="text"
          placeholder="employeesNumber"
          className="w-1/2"
        />
        <Input
          id="legalStatus"
          type="text"
          placeholder="legalStatus"
          className="w-1/2"
        />
        <Input
          id="socialCapital"
          type="text"
          placeholder="socialCapital"
          className="w-1/2"
        />
        <Input
          id="headquarter"
          type="text"
          placeholder="headquarter"
          className="w-1/2"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Input
          id="website"
          type="url"
          placeholder="website"
          className="w-1/2"
        />
        <Textarea
          id="description"
          type="text"
          placeholder="description"
          className="w-1/2"
        />
        <Input
          id="phoneNumber"
          type="text"
          placeholder="phoneNumber"
          className="w-1/2"
        />
        <Input id="nrc" type="text" placeholder="nrc" className="w-1/2" />
        <Input id="nif" type="text" placeholder="nif" className="w-1/2" />
        <Input
          id="businessSectors"
          type="text"
          placeholder="businessSectors"
          className="w-1/2"
        />
        <Input id="logo" type="file" placeholder="logo" className="w-1/2" />
      </div>
      <Button onClick={handleSignup}>Signup</Button>
    </form>
  )
}

export default SignupForm
