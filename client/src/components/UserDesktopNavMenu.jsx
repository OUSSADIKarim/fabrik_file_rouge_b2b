import { NavLink } from "react-router-dom"
import SwitchTheme from "./SwitchTheme"
import UserAvatarMenu from "./UserAvatarMenu"

const UserDesktopNavMenu = ({ links }) => {
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
        <SwitchTheme />
        <UserAvatarMenu />
      </div>
    </div>
  )
}

export default UserDesktopNavMenu
