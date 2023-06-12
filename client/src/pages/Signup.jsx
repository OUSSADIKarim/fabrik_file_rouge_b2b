import SignupForm from "../components/SignupForm"
import logo from "../assets/logo.svg"

const Signup = () => {
  return (
    <main className="w-full flex">
      <div className="bg_pattern relative flex-1 hidden items-center justify-center h-screen lg:flex">
        <div className="relative z-10 w-full max-w-md ">
          <div className=" mt-16 space-y-3">
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
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-start justify-center h-screen">
        <div className="w-full max-w-md space-y-4 px-4 transition-all ease-in-out duration-300 bg-tertiary dark:bg-secondary text-secondary dark:text-tertiary sm:px-0">
          <div className="">
            <div className="mt-5 space-y-2">
              <h3 className="text-primary text-center text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
            </div>
          </div>
          <SignupForm />
        </div>
      </div>
    </main>
  )
}

export default Signup
