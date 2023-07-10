import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@teovilla/shadcn-ui-react"
import { useEffect, useState } from "react"
import { useLatestMessage } from "../../hooks/apis/messaging/useLatestMessage"
import useChatRoomState from "../../hooks/contexts/useChatRoomState"
import { useErrorBoundary } from "react-error-boundary"
import useLogState from "./../../hooks/contexts/useLogState"

const ChatCompanyCard = ({ chatRoom }) => {
  const [otherUser, setOtherUser] = useState(null)
  const [message, setMessage] = useState(null)
  const { user } = useLogState()
  const { setReceiverId, setChatRoomId, messages, socket } = useChatRoomState()
  const { showBoundary } = useErrorBoundary()
  const {
    data: latestMessage,
    refetch: getLatestMessage,
    error,
  } = useLatestMessage(chatRoom)

  useEffect(() => {
    getLatestMessage()
    setMessage(latestMessage?.[0])
    console.log({ message })
    user?.companyId === message?.sender?._id
      ? setOtherUser(message?.receiver)
      : setOtherUser(message?.sender)
  }, [getLatestMessage, latestMessage, message, user])

  useEffect(() => {
    getLatestMessage()
  }, [messages])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage(data)
    })
  }, [socket])

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  const handleClick = (e) => {
    e.preventDefault()
    console.log({ otherUser })
    console.log({ chatRoom })
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
