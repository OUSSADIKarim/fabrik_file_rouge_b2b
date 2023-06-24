import { createContext, useState } from "react"

export const ChatRoomContext = createContext({})

export const ChatRoomProvider = ({ children }) => {
  const [chatRoomId, setChatRoomId] = useState(null)
  const [receiverId, setReceiverId] = useState(null)

  return (
    <ChatRoomContext.Provider
      value={{ chatRoomId, setChatRoomId, receiverId, setReceiverId }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
