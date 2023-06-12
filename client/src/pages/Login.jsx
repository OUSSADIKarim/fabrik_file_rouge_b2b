import { useEffect } from "react"
import LoginForm from "../components/LoginForm"
import useLogState from "../hooks/useLogState"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { logState } = useLogState()
  const navigate = useNavigate()
  useEffect(() => {
    logState && navigate("/")
  }, [logState, navigate])

  return (
    <main className="h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl">
      <h1 className="text-white">Login</h1>
      <LoginForm className="w-1/2" />
    </main>
  )
}

export default Login
