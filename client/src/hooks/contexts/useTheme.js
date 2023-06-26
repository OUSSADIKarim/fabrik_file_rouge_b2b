import { useContext } from "react"
import { ThemContext } from "../../context/themeProvider"

const useTheme = () => {
  return useContext(ThemContext)
}

export default useTheme
