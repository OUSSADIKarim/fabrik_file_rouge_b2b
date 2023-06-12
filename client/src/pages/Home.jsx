import AddEmployeeForm from "../components/AddEmployeeForm"

const Home = () => {
  return (
    <>
      <main className="h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl">
        <AddEmployeeForm />
      </main>
    </>
  )
}

export default Home
