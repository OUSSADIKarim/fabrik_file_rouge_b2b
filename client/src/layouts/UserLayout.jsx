import { Outlet } from "react-router-dom"
import UserNavbar from "../components/UserNavbar"

const UserLayout = () => {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  )
}

export default UserLayout
