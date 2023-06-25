import { createContext, useState } from "react"
import io from "socket.io-client"

export const ChatRoomContext = createContext({})

export const ChatRoomProvider = ({ children }) => {
  const [chatRoomId, setChatRoomId] = useState(null)
  const [receiverId, setReceiverId] = useState(null)
  const [messages, setMessages] = useState([])
  const socket = io("http://localhost:8081")

  return (
    <ChatRoomContext.Provider
      value={{
        chatRoomId,
        setChatRoomId,
        receiverId,
        setReceiverId,
        socket,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
