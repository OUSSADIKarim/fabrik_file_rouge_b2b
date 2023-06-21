import { useEffect, useState } from "react"
import ChatRooms from "../components/ChatRooms"
import MessageContainer from "../components/MessageContainer"
import { useChatRooms } from "../hooks/useChatRooms"

export const Messaging = () => {
  const [chatRooms, setChatRooms] = useState([])
  const { data: chatRoomsList, refetch: getChatRooms } = useChatRooms()

  useEffect(() => {
    getChatRooms()
    setChatRooms(chatRoomsList)
  }, [chatRoomsList, getChatRooms])

  return (
    <main className="h-[100vh] flex items-center justify-center">
      <ChatRooms chatRooms={chatRooms} />
      <MessageContainer />
    </main>
  )
}
