import { NavLink } from "react-router-dom"
import logo from "../assets/logo.svg"
import { Button } from "@teovilla/shadcn-ui-react"
import useTheme from "../hooks/useTheme"

const VisitorNavbar = () => {
  const { theme, setTheme } = useTheme()
  const switchTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }
  return (
    <nav className="fixed w-full flex items-center justify-between h-[75px] p-8 bg-secondary ">
      <div>
        <NavLink to={"/"} className="flex items-center justify-center w-[80px]">
          <img
            src={logo}
            alt="Bee2Bee"
            className=" transition-all ease-in-out duration-300 hover:text-tertiary hover:scale-110"
          />
        </NavLink>
      </div>
      <div className="hidden md:flex items-center justify-evenly  w-[80%]">
        <div className="hidden md:flex items-center justify-center gap-8 w-full">
          <NavLink
            to={"/"}
            className="text-tertiary text-xl font-medium transition-all ease-in-out duration-300 hover:text-primary hover:scale-105"
          >
            Home
          </NavLink>
          <NavLink
            to={"/about"}
            className="text-tertiary text-xl font-medium transition-all ease-in-out duration-300 hover:text-primary hover:scale-105"
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className="text-tertiary text-xl font-medium transition-all ease-in-out duration-300 hover:text-primary hover:scale-105"
          >
            Contact
          </NavLink>
        </div>
        <div className="hidden md:flex items-center justify-end gap-8 w-1/2">
          <Button
            onClick={switchTheme}
            variant={"ghost"}
            className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent hover:scale-105 active:bg-transparent focus:ring-0 dark:focus:ring-0  dark:active:bg-transparent transition-all ease-in-out duration-300 "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125V1.875ZM10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0Z"
                fill="black"
                className="fill-primary dark:fill-tertiary transition-all ease-in-out duration-300"
              />
            </svg>
          </Button>
          <NavLink
            to={"/login"}
            className="text-tertiary text-xl font-medium transition-all ease-in-out duration-300 hover:text-primary hover:scale-105"
          >
            Login
          </NavLink>
          <NavLink
            to={"/signup"}
            className="bg-primary text-secondary text-xl font-medium transition-all ease-in-out duration-300 hover:bg-tertiary hover:scale-105 p-2 rounded-md"
          >
            Signup
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default VisitorNavbar
