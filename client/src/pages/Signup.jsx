import SignupForm from "../components/SignupForm"

const Signup = () => {
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl">
      <h1 className="text-white">Signup</h1>
      <SignupForm className="w-1/2" />
    </main>
  )
}

export default Signup
