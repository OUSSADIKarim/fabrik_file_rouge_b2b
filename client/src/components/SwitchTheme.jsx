import { Button } from "@teovilla/shadcn-ui-react"
import useTheme from "../hooks/contexts/useTheme"

const SwitchTheme = () => {
  const { theme, setTheme } = useTheme()
  const switchTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark")
  }
  return (
    <Button
      onClick={switchTheme}
      variant={"ghost"}
      className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent hover:scale-125 focus:ring-0 focus:ring-offset-0 transition-all ease-in-out duration-300 "
    >
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
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100  stroke-tertiary"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>

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
        className="rotate-0 scale-100 transition-all dark:-rotate-90  dark:scale-0 fill-primary stroke-primary"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 3v1"></path>
        <path d="M12 20v1"></path>
        <path d="M3 12h1"></path>
        <path d="M20 12h1"></path>
        <path d="m18.364 5.636-.707.707"></path>
        <path d="m6.343 17.657-.707.707"></path>
        <path d="m5.636 5.636.707.707"></path>
        <path d="m17.657 17.657.707.707"></path>
      </svg>
    </Button>
  )
}

export default SwitchTheme
