import { useEmployeesList } from "../hooks/useEmployeesList"

const EmployeesList = () => {
  const { data: employees } = useEmployeesList()
  console.log({ employees })
  return (
    <>
      <h1 className="text-white">Employee List</h1>
      {employees?.map((employee) => {
        console.log(employee)
        return (
          <h2 className="text-white" key={employee._id}>
            {employee.firstName}
          </h2>
        )
      })}
    </>
  )
}

export default EmployeesList
