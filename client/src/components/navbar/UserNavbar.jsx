import { NavLink } from "react-router-dom"
import logo from "../../assets/logo_icon.svg"
import UserMobileNavMenu from "./UserMobileNavMenu"
import UserDesktopNavMenu from "./UserDesktopNavMenu"

const UserNavbar = () => {
  const links = [
    {
      name: "Home",
      path: "/feed",
    },
    {
      name: "Messaging",
      path: "/messaging",
    },
    {
      name: "Notifications",
      path: "/notifications",
    },
  ]
  return (
    <nav className="sticky top-0 w-full flex items-center justify-between h-[50px] p-8 bg-tertiary dark:bg-secondary border-b-2 dark:border-b-[1px] z-50">
      <div className="transition-all ease-in-out duration-300 hover:scale-105 ml-4">
        <NavLink to={"/"} className="flex items-center justify-center w-[75px]">
          <img src={logo} alt="Bee2Bee" />
          <p className="text-primary font-bold ml-2">Bee2Bee</p>
        </NavLink>
      </div>
      <UserMobileNavMenu links={links} />
      <UserDesktopNavMenu links={links} />
    </nav>
  )
}

export default UserNavbar
