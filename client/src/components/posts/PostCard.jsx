import { Avatar, AvatarFallback, AvatarImage } from "@teovilla/shadcn-ui-react"
import { Link } from "react-router-dom"

const PostCard = ({ post, innerRef }) => {
  return (
    <Link to={`${post?._id}`} ref={innerRef} className="block w-full">
      <Avatar>
        <AvatarImage
          src={post?.company?.logoURL?.publicId}
          alt={post?.company?.name}
        />
        <AvatarFallback>{post?.company?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <p>{post?.company?.name}</p>
      <p>{post?.createdAt}</p>

      <div>{post?.content}</div>
    </Link>
  )
}

export default PostCard
