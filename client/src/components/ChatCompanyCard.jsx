import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "@teovilla/shadcn-ui-react"
import { useEffect, useState } from "react"
import { useLatestMessage } from "../hooks/useLatestMessage"

const ChatCompanyCard = ({ chatRoom }) => {
  const [otherUser, setOtherUser] = useState(null)
  const [message, setMessage] = useState(null)
  const { data: latestMessage, refetch: getLatestMessage } =
    useLatestMessage(chatRoom)

  useEffect(() => {
    getLatestMessage()
    setMessage(latestMessage?.[0])
    localStorage.user === message?.sender?._id
      ? setOtherUser(message?.receiver)
      : setOtherUser(message?.sender)
  }, [getLatestMessage, latestMessage, message, otherUser])

  return (
    <Button className="w-full h-full bg-tertiary hover:bg-primary flex gap-3 justify-start">
      <Avatar>
        <AvatarImage src={otherUser?.logoURL?.publicId} alt={otherUser?.name} />
        <AvatarFallback>{otherUser?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start text-black">
        <p className="block text-sm text-gray-700 font-semibold">
          {otherUser?.name}
        </p>
        <p className="text-start line-clamp-1">{message?.content}</p>
      </div>
    </Button>
  )
}

export default ChatCompanyCard
