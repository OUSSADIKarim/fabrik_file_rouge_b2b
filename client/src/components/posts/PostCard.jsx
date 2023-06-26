import { Avatar, AvatarFallback, AvatarImage } from "@teovilla/shadcn-ui-react"

const PostCard = ({ post }) => {
  return (
    <div>
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
    </div>
  )
}

export default PostCard
