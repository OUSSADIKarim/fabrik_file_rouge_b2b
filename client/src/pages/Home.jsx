import { usePageTransition } from "../hooks/animations/usePageTransition"
import AddEmployeeForm from "./../components/employees/AddEmployeeForm"
const Home = () => {
  const animationRef = usePageTransition()

  return (
    <main
      ref={animationRef}
      className="h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl"
    >
      <AddEmployeeForm />
    </main>
  )
}

export default Home
