import useLogState from "../hooks/useLogState"
import UserNavbar from "./UserNavbar"
import VisitorNavbar from "./visitorNavbar"

const Navbar = () => {
  const { logState } = useLogState()
  console.log(logState)
  return <>{logState ? <UserNavbar /> : <VisitorNavbar />}</>
}

export default Navbar
