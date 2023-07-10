import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@teovilla/shadcn-ui-react"
import { ArrowBigUp, ArrowBigDown } from "lucide-react"
import { Link } from "react-router-dom"
import { useIncrementVotes } from "../../hooks/apis/posts/useIncrementVotes"
import { useDecrementVotes } from "../../hooks/apis/posts/useDecrementVote"
import SendMessageForm from "./../messaging/SendMessageForm"

const PostCard = ({ post, innerRef }) => {
  const { mutate: incrementVote } = useIncrementVotes()
  const { mutate: decrementVote } = useDecrementVotes()

  const handleIncrementVote = () => {
    incrementVote(post?._id, {
      onSuccess: (data) => {
        post.votes = data.votes
      },
    })
  }

  const handleDecrementVote = () => {
    decrementVote(post?._id, {
      onSuccess: (data) => {
        post.votes = data.votes
      },
    })
  }
  return (
    <article
      to={`${post?._id}`}
      ref={innerRef}
      className="w-full p-2 flex flex-col gap-2 bg-tertiary dark:bg-backgroundDark_primary rounded-xl dark:text-tertiary"
    >
      <div className="flex gap-2">
        <HoverCard>
          <HoverCardTrigger>
            <Avatar>
              <AvatarImage
                src={post?.company?.logoURL?.publicId}
                alt={post?.company?.name}
              />
              <AvatarFallback className="bg-primary dark:bg-primary">
                {post?.company?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent>
            <SendMessageForm receiverId={post?.company?._id} />
          </HoverCardContent>
        </HoverCard>

        <div>
          <p>{post?.company?.name}</p>
          <p>{post?.category}</p>
          <p className="text-sm">{postCreationDate(post?.createdAt)}</p>
        </div>
      </div>
      <div className="w-full">
        <p className="w-full break-words line-clamp-2">{post?.content}</p>
        <Link
          to={`/feed/${post?._id}`}
          className="hover:underline underline-offset-4"
        >
          View more
        </Link>

        <div className="flex items-center justify-start gap-2 mt-4">
          {post?.votes}
          <Button onClick={handleIncrementVote}>
            <ArrowBigUp className="cursor-pointer stroke-primary hover:fill-primary" />
          </Button>
          <Button onClick={handleDecrementVote}>
            <ArrowBigDown className="cursor-pointer stroke-primary hover:fill-primary" />
          </Button>
        </div>
      </div>
    </article>
  )
}

const postCreationDate = (date) => {
  const currentDate = new Date()
  const jsDate = new Date(date)

  const diffInMin = Math.abs(currentDate - jsDate) / (1000 * 60)

  const diffInHours = Math.abs(currentDate - jsDate) / (1000 * 60 * 60)

  const diffInDays =
    (currentDate.getTime() - jsDate.getTime()) / (24 * 3600 * 1000)

  const diffInWeeks =
    (currentDate.getTime() - jsDate.getTime()) / (24 * 3600 * 1000 * 7)

  const diffInYears = currentDate.getFullYear() - jsDate.getFullYear()

  if (diffInMin < 1) {
    return "Just now"
  }

  if (diffInMin > 0 && diffInMin < 60) {
    return `${parseInt(diffInMin)} min`
  }

  if (diffInHours > 0 && diffInHours < 24) {
    return `${parseInt(diffInHours)} h`
  }

  if (parseInt(diffInDays) > 0 && parseInt(diffInDays) < 7) {
    if (parseInt(diffInDays) === 1) {
      return `${parseInt(diffInDays)} d`
    }
    return `${parseInt(diffInDays)} d`
  }

  if (parseInt(diffInWeeks) > 0 && parseInt(diffInWeeks) < 48) {
    if (parseInt(diffInWeeks) === 1) {
      return `${parseInt(diffInWeeks)} week`
    }

    return `${parseInt(diffInWeeks)} weeks`
  }

  if (parseInt(diffInYears) > 0) {
    if (parseInt(diffInYears) === 1) {
      return `${parseInt(diffInWeeks)} year`
    }
    return `${parseInt(diffInWeeks)} years`
  }
}
export default PostCard
