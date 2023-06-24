import AllMessages from "./AllMessages"
import SendMessageForm from "./SendMessageForm"

const MessageContainer = () => {
  return (
    <section className="w-full h-full grid grid-cols-1 grid-rows-[90%,20%] gap-4 p-2">
      <AllMessages />
      <SendMessageForm />
    </section>
  )
}

export default MessageContainer
