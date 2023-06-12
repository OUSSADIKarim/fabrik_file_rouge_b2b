import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@teovilla/shadcn-ui-react"
import SwitchTheme from "./SwitchTheme"
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.svg"

const MobileNavMenu = ({ links }) => {
  return (
    <div className="md:hidden w-full flex items-center justify-end">
      <SwitchTheme />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent hover:scale-125 focus:ring-0 focus:ring-offset-0 transition-all ease-in-out duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu transition-all dark:scale-125 stroke-primary pointer-events-none"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed top-0 right-0 h-full w-1/2 rounded-lg slide-in-from-top-0 slide-in-from-right-20 flex flex-col items-center gap-20 dark:bg-secondary">
          <DialogHeader className="flex items-center self-center mt-10">
            <NavLink
              to={"/"}
              className="flex items-center justify-center w-[80px]"
            >
              <img
                src={logo}
                alt="Bee2Bee"
                className=" transition-all ease-in-out duration-300 hover:scale-110"
              />
            </NavLink>
          </DialogHeader>
          <div className="flex flex-col items-center justify-evenly gap-8">
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
          <div className="flex flex-col items-center justify-end gap-8 w-1/2">
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
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MobileNavMenu
