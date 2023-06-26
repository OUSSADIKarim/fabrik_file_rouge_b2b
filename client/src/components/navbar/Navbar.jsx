import useLogState from "../../hooks/contexts/useLogState"
import Loading from "../Loading"
import UserNavbar from "./UserNavbar"
import VisitorNavbar from "./visitorNavbar"

const Navbar = () => {
  const { logState } = useLogState()
  if (logState === null) {
    return <Loading />
  }
  return <>{logState ? <UserNavbar /> : <VisitorNavbar />}</>
}

export default Navbar
