import { useEffect, useState } from "react"
import { useGetPost } from "../hooks/apis/posts/useGetPost"
import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@teovilla/shadcn-ui-react"

const Post = () => {
  const [post, setPost] = useState()
  const { postId } = useParams()
  const { data } = useGetPost(postId)
  useEffect(() => {
    setPost(data)
  }, [data])

  return (
    <main className="w-full h-full p-8 flex flex-col justify-center items-center bg_pattern-second ">
      <section className="w-full xl:w-[1024px] h-full bg-white p-8">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={post?.company?.logoURL?.publicId}
              alt={post?.company?.name}
            />
            <AvatarFallback>{post?.company?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p>{post?.company.name}</p>
            <p>{post?.createdAt}</p>
          </div>
        </div>
        <p>{post?.content}</p>
      </section>
    </main>
  )
}

export default Post
