import useLogState from "../../hooks/contexts/useLogState"
import UserNavbar from "./UserNavbar"
import VisitorNavbar from "./visitorNavbar"

const Navbar = () => {
  const { logState } = useLogState()

  return <>{logState ? <UserNavbar /> : <VisitorNavbar />}</>
}

export default Navbar
