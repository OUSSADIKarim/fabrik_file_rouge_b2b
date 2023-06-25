import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@teovilla/shadcn-ui-react"
import { useEffect, useState } from "react"
import { useLatestMessage } from "../hooks/useLatestMessage"
import useChatRoomState from "../hooks/useChatRoomState"

const ChatCompanyCard = ({ chatRoom }) => {
  const [otherUser, setOtherUser] = useState(null)
  const [message, setMessage] = useState(null)
  const { setReceiverId, setChatRoomId, messages, socket } = useChatRoomState()
  const { data: latestMessage, refetch: getLatestMessage } =
    useLatestMessage(chatRoom)

  useEffect(() => {
    getLatestMessage()
    setMessage(latestMessage?.[0])
    localStorage.user === message?.sender?._id
      ? setOtherUser(message?.receiver)
      : setOtherUser(message?.sender)
  }, [getLatestMessage, latestMessage, message, otherUser])

  useEffect(() => {
    getLatestMessage()
  }, [messages])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage(data)
    })
  }, [socket])

  const handleClick = (e) => {
    e.preventDefault()
    setReceiverId(otherUser?._id)
    setChatRoomId(chatRoom?._id)
    socket.emit("join_ChatRoom", chatRoom?._id)
  }

  return (
    <Button
      className="w-fit sm:w-full h-fit bg-tertiary hover:bg-primary flex gap-3 sm:justify-start rounded-none "
      onClick={handleClick}
    >
      <Avatar>
        <AvatarImage src={otherUser?.logoURL?.publicId} alt={otherUser?.name} />
        <AvatarFallback>{otherUser?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="hidden sm:flex flex-col text-black">
        <p className="text-sm text-gray-700 font-semibold ">
          {otherUser?.name}
        </p>
        <p className=" text-start line-clamp-1">{message?.content}</p>
      </div>
    </Button>
  )
}

export default ChatCompanyCard
