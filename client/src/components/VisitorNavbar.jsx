import { NavLink } from "react-router-dom"
import logo from "../assets/logo.svg"
import MobileNavMenu from "./MobileNavMenu"
import DesktopMenue from "./DesktopMenue"

const VisitorNavbar = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ]
  return (
    <nav className="sticky top-0 w-full flex items-center justify-between h-[50px] p-8 bg-tertiary dark:bg-secondary border-b-2 dark:border-b-[1px] z-50">
      <div>
        <NavLink to={"/"} className="flex items-center justify-center w-[80px]">
          <img
            src={logo}
            alt="Bee2Bee"
            className=" transition-all ease-in-out duration-300 hover:scale-110"
          />
        </NavLink>
      </div>
      <MobileNavMenu links={links} />
      <DesktopMenue links={links} />
    </nav>
  )
}

export default VisitorNavbar
