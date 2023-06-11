import AddEmployeeForm from "../components/AddEmployeeForm"
// import EmployeesList from "../components/EmployeesList"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl">
        <AddEmployeeForm />
        {/* <EmployeesList /> */}
      </main>
    </>
  )
}

export default Home
