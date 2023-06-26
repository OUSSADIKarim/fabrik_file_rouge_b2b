import { Outlet } from "react-router-dom"
import UserNavbar from "../components/navbar/UserNavbar"

const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <UserNavbar />
      <Outlet />
    </div>
  )
}

export default UserLayout
