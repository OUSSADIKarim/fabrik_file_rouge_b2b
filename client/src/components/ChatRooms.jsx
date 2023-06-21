import ChatCompanyCard from "./ChatCompanyCard"

const ChatRooms = ({ chatRooms }) => {
  return (
    <section className="w-full flex ">
      {chatRooms?.map((chatRoom, i) => {
        return <ChatCompanyCard key={chatRoom._id} chatRoom={chatRoom} />
      })}
    </section>
  )
}

export default ChatRooms
