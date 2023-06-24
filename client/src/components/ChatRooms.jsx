import ChatCompanyCard from "./ChatCompanyCard"

const ChatRooms = ({ chatRooms }) => {
  return (
    <section className="w-full sm:h-full flex sm:flex-col self-start gap-2 overflow-x-scroll sm:overflow-x-hidden sm:overflow-y-scroll max-sm:no-scrollbar py-2">
      {chatRooms?.map((chatRoom) => {
        return <ChatCompanyCard key={chatRoom._id} chatRoom={chatRoom} />
      })}
    </section>
  )
}

export default ChatRooms
