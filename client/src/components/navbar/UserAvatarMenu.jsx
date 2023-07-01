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
import { NavLink } from "react-router-dom"
import { useLogout } from "../../hooks/apis/auth/useLogout"
import { useEffect } from "react"
import { useErrorBoundary } from "react-error-boundary"

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

  const { showBoundary } = useErrorBoundary()
  const { refetch: logout, error } = useLogout()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
  }

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
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
  )
}

export default UserAvatarMenu
