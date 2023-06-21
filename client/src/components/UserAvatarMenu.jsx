import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@teovilla/shadcn-ui-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import useLogState from "../hooks/useLogState"
import useAccessTokenState from "../hooks/useAccessTokenState"
import { useState } from "react"
import Loading from "./Loading"
import Error from "./Error"

const UserAvatarMenu = () => {
  const menueOptions = [
    {
      name: "Profile",
      path: "/company",
    },
    {
      name: "Team",
      path: "/team",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ]

  const [errorMessage] = useState("")
  const { refetch: logout } = useLogout()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
  }
  return (
    <>
      {errorMessage && <Error errorMessage={errorMessage} />}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menueOptions.map((option, index) => {
            return (
              <DropdownMenuItem key={index}>
                <NavLink to={option.path}>{option.name}</NavLink>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={handleLogout}>Log out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAvatarMenu
