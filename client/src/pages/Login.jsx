import { useEffect } from "react"
import LoginForm from "../components/LoginForm"
import useLogState from "../hooks/useLogState"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo_icon.svg"

const Login = () => {
  const { logState } = useLogState()
  const navigate = useNavigate()
  useEffect(() => {
    logState && navigate("/")
  }, [logState, navigate])

  return (
    <main className="w-full h-[100vh] overflow-hidden flex bg_pattern pt-4">
      <div className="bg_pattern relative flex-1 hidden items-center justify-center h-screen lg:flex transition-all ease-in-out duration-300 shadow-[inset_20px_20px_1000px_#ffffff] dark:shadow-[inset_20px_20px_1000px_#121212] blur-[0.5px]">
        <div className="relative z-10 w-full max-w-md ">
          <div className=" mt-10 space-y-5">
            <NavLink
              to="/"
              className="flex flex-col items-center justify-center gap-8 transition-all ease-in-out duration-300 hover:scale-105"
            >
              <img src={logo} alt="Bee2Bee" width="150px" />
              <h1 className="text-primary font-bold text-3xl">Bee2Bee</h1>
            </NavLink>
            <h3 className="text-secondary dark:text-tertiary text-3xl font-bold">
              Start growing your business quickly
            </h3>
            <p className="text-secondary dark:text-tertiary">
              Create an account and get access to all features for 30-days, No
              credit card required.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <p className="text-sm text-secondary dark:text-tertiary font-medium translate-x-5">
                Join 5.000+ companies
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen transition-all ease-in-out duration-300">
        <div className="w-full max-w-md space-y-4 px-4 transition-all ease-in-out duration-300 bg-tertiary dark:bg-secondary text-secondary dark:text-tertiary sm:px-0">
          <div>
            <div className="mt-5 space-y-2">
              <h3 className="text-primary text-center text-2xl font-bold sm:text-3xl">
                Log in
              </h3>
              <p className="text-center mr-1">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  className="text-primary font-semibold hover:bg-secondary hover:text-tertiary hover:rounded-md hover:p-1 dark:hover:bg-tertiary dark:hover:text-secondary transition-all ease-in-out duration-300"
                >
                  Sign up here
                </NavLink>
              </p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

export default Login
