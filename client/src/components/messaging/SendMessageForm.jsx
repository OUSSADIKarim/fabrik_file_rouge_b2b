import { Button, Input } from "@teovilla/shadcn-ui-react"
import { useEffect, useState } from "react"
import { useSendMessage } from "../../hooks/apis/messaging/useSendMessage"
import useChatRoomState from "../../hooks/contexts/useChatRoomState"
import { useErrorBoundary } from "react-error-boundary"

const SendMessageForm = ({ receiverId }) => {
  const { socket } = useChatRoomState()
  const [disabledInput, setDisabledInput] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [message, setMessage] = useState({
    receiverId: "",
    body: "",
  })

  const { showBoundary } = useErrorBoundary()
  const { mutate: sendMessage, error } = useSendMessage()

  useEffect(() => {
    !receiverId
      ? () => {
          setDisabledInput(true)
          setDisabledBtn(true)
        }
      : () => {
          setDisabledInput(false)
          setDisabledBtn(false)
        }
    !message.body ? setDisabledBtn(true) : setDisabledBtn(false)
  }, [message.body, receiverId])

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  const handdleMessage = (e) => {
    console.log({ socket })
    e.preventDefault()
    console.log({ message })
    sendMessage(message, {
      onSuccess: async (data) => {
        console.log({ socket })
        await socket.emit("send_message", data.data)
        setMessage({ ...message, body: "" })
        console.log({ ff: message })
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
        value={message.body}
        onChange={(e) => {
          setMessage({
            receiverId: receiverId,
            body: e.target.value,
          })
        }}
        disabled={disabledInput}
      />
      <Button type="submit" disabled={disabledBtn}>
        Send
      </Button>
    </form>
  )
}

export default SendMessageForm
