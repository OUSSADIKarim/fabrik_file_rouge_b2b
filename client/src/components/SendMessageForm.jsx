import { Button, Input } from "@teovilla/shadcn-ui-react"
import { useEffect, useState } from "react"
import { useSendMessage } from "../hooks/useSendMessage"
import useChatRoomState from "../hooks/useChatRoomState"

const SendMessageForm = () => {
  const { receiverId, socket, setMessages, messages } = useChatRoomState()
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState({
    receiverId: "",
    body: "",
  })
  const { mutate: sendMessage } = useSendMessage()

  useEffect(() => {
    !receiverId ? setDisabled(true) : setDisabled(false)
  }, [receiverId])

  const handdleMessage = (e) => {
    e.preventDefault()
    sendMessage(message, {
      onSuccess: async (data) => {
        await socket.emit("send_message", data.data)
        setMessage({ receiverId: "", body: "" })
      },
      onError: (err) => {
        console.log({ err })
      },
    })
  }
  return (
    <form
      className="h-fit flex justify-center items-center"
      onSubmit={handdleMessage}
    >
      <Input
        type="text"
        placeholder="message"
        onChange={(e) => {
          setMessage({
            receiverId: receiverId,
            body: e.target.value,
          })
        }}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled}>
        Send
      </Button>
    </form>
  )
}

export default SendMessageForm
