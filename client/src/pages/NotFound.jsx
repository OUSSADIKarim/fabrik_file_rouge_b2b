import { NavLink } from "react-router-dom"
import { usePageTransition } from "../hooks/animations/usePageTransition"

const NotFound = () => {
  const animationRef = usePageTransition()

  return (
    <section
      ref={animationRef}
      className="bg-tertiary dark:bg-secondary h-[100vh] flex flex-col items-center justify-center gap-4 text-4xl"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-secondary dark:text-tertiary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-secondary dark:text-tertiary">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-secondary dark:text-tertiary">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <NavLink
            to={"/"}
            className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 rounded-md"
          >
            Back To Home Page
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default NotFound
