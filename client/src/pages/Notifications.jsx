import { usePageTransition } from "../hooks/animations/usePageTransition"

const Notifications = () => {
  const animationRef = usePageTransition()

  return <main ref={animationRef}>Notifications</main>
}

export default Notifications
