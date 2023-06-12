import { NavLink } from "react-router-dom"
import SwitchTheme from "./SwitchTheme"

const DesktopMenue = ({ links }) => {
  return (
    <div className="hidden md:flex items-center justify-evenly  w-[80%]">
      <div className="hidden md:flex items-center justify-center gap-8 w-full">
        {links.map((link, index) => {
          return (
            <NavLink
              key={index}
              to={link.path}
              className="text-secondary dark:text-tertiary [&:is(.active)]:text-primary text-lg font-medium transition-all ease-in-out duration-300 hover:text-primary dark:hover:text-primary hover:scale-105"
            >
              {link.name}
            </NavLink>
          )
        })}
      </div>
      <div className="hidden md:flex items-center justify-end gap-8 w-1/2">
        <NavLink
          to={"/login"}
          className="text-secondary dark:text-tertiary [&:is(.active)]:text-primary text-lg font-medium transition-all ease-in-out duration-300 hover:text-primary dark:hover:text-primary hover:scale-105"
        >
          Login
        </NavLink>
        <NavLink
          to={"/signup"}
          className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 rounded-md"
        >
          Signup
        </NavLink>
      </div>
      <SwitchTheme />
    </div>
  )
}

export default DesktopMenue
