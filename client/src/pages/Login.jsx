import LoginForm from "../components/LoginForm"

const Login = () => {
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl">
      <h1 className="text-white">Login</h1>
      <LoginForm className="w-1/2" />
    </main>
  )
}

export default Login
