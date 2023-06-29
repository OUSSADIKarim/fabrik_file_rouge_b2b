import { useEffect, useState } from "react"
import ChatRooms from "../components/messaging/ChatRooms"
import MessageContainer from "../components/messaging/MessageContainer"
import { useChatRooms } from "../hooks/apis/messaging/useChatRooms"
import { ChatRoomProvider } from "../context/ChatRoomContext"
import { usePageTransition } from "../hooks/animations/usePageTransition"

export const Messaging = () => {
  const [chatRooms, setChatRooms] = useState([])
  const { data, refetch: getChatRooms } = useChatRooms()

  const animationRef = usePageTransition()

  useEffect(() => {
    getChatRooms()
    setChatRooms(data)
  }, [data, getChatRooms])

  return (
    <main
      ref={animationRef}
      className="h-screen overflow-hidden grid grid-rows-[10%,90%] sm:grid-rows-1 grid-cols-1 sm:grid-cols-[25%,75%]"
    >
      <ChatRoomProvider>
        <ChatRooms chatRooms={chatRooms} />
        <MessageContainer />
      </ChatRoomProvider>
    </main>
  )
}
