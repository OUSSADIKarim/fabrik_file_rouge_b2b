import { Button, Input } from "@teovilla/shadcn-ui-react"
import { useState } from "react"
import Loading from "../Loading"
import Error from "../Error"
import { useAddEmployee } from "../../hooks/apis/employees/useAddEmployee"

const AddEmployeeForm = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { mutate: sendMessage, isLoading } = useAddEmployee(employee)
  const handleAddEmployee = (e) => {
    e.preventDefault()
    setErrorMessage("")
    sendMessage(employee, {
      onSuccess: (employee) => {
        console.log({ employee })
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
          id="firstName"
          type="text"
          placeholder="firstName"
          className="w-1/3"
          onChange={(e) =>
            setEmployee({ ...employee, firstName: e.target.value })
          }
        />
        <Input
          id="lastName"
          type="text"
          placeholder="lastName"
          className="w-1/3"
          onChange={(e) =>
            setEmployee({ ...employee, lastName: e.target.value })
          }
        />
        <Input
          id="phoneNumber"
          type="phoneNumber"
          placeholder="phoneNumber"
          className="w-1/3"
          onChange={(e) =>
            setEmployee({ ...employee, phoneNumber: e.target.value })
          }
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="w-1/3"
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />

        <Button onClick={handleAddEmployee}>Add employee</Button>
      </form>
    </>
  )
}

export default AddEmployeeForm
