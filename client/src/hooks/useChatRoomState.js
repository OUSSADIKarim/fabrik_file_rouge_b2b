import { useContext } from "react"
import { ChatRoomContext } from "../context/ChatRoomContext"

const useChatRoomState = () => {
  return useContext(ChatRoomContext)
}

export default useChatRoomState
