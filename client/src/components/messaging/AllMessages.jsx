import { useAllMessages } from "../../hooks/apis/messaging/useAllMessages"
import { useEffect, useRef, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { useIntersection } from "@mantine/hooks"
import useChatRoomState from "../../hooks/contexts/useChatRoomState"

const AllMessages = () => {
  const [newMessage, setnewMessage] = useState(null)
  const { chatRoomId, messages, setMessages, socket } = useChatRoomState()
  const userId = localStorage.user
  const lastMessageRef = useRef(null)

  const { data, fetchNextPage, hasNextPage } = useAllMessages(chatRoomId)

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  })

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setnewMessage(data)
    })
  }, [socket])

  useEffect(() => {
    if (newMessage?.chatRoom === chatRoomId) {
      setMessages((prev) => {
        return [newMessage, ...prev]
      })
    }
  }, [newMessage])

  useEffect(() => {
    data.pages = []
    data.pageParams = []
    fetchNextPage()
  }, [chatRoomId])

  useEffect(() => {
    if (chatRoomId && hasNextPage && entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage])

  useEffect(() => {
    setMessages(data?.pages.flatMap((message) => message))
  }, [data])

  return (
    <div className="h-full">
      {!chatRoomId ? (
        <h3>No company selected</h3>
      ) : (
        <ScrollToBottom
          className="w-full h-full"
          initialScrollBehavior="smooth"
        >
          <div className="flex flex-col-reverse gap-8 p-4">
            {messages?.map((message, i) => {
              return i === messages?.length - 2 ? (
                <p
                  className={`px-4 py-2 rounded-xl
                  ${
                    userId === message?.sender
                      ? "self-end bg-primary text-tertiary"
                      : "self-start bg-[#d8d8d8] text-secondary"
                  }
                  `}
                  key={i}
                  ref={ref}
                >
                  {message?.content}
                </p>
              ) : (
                <p
                  className={`px-4 py-2 rounded-xl
                ${
                  userId === message?.sender
                    ? "self-end bg-primary text-tertiary"
                    : "self-start bg-[#d8d8d8] text-secondary"
                }
                `}
                  key={i}
                >
                  {message?.content}
                </p>
              )
            })}
          </div>
        </ScrollToBottom>
      )}
    </div>
  )
}

export default AllMessages
