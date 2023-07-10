import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@teovilla/shadcn-ui-react"
import { useEffect, useState } from "react"
import { useCreatePost } from "../../hooks/apis/posts/useCreatePost"
import { useErrorBoundary } from "react-error-boundary"
import useLogState from "../../hooks/contexts/useLogState"

export const CreatePostForm = ({ setNewPost, postCategories }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const { user } = useLogState()

  const [post, setPost] = useState({
    category: "Investement",
    content: "",
  })
  const { showBoundary } = useErrorBoundary()
  const { mutate, error } = useCreatePost(setNewPost)

  const handdlecreatePost = (e) => {
    e.preventDefault()
    mutate(post, {
      onSuccess: () => {
        setOpenDialog(false)
      },
    })
  }

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-backgroundLight dark:bg-backgroundDark_secondary justify-start w-full md:w-10/12 rounded-xl hover:bg-primary dark:hover:bg-primary focus:ring-primary dark:focus:ring-primary"
        >
          Create a new post
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full md:max-h-[90%] md:max-w-4xl self-center flex flex-col dark:bg-backgroundDark_primary dark:text-tertiary">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.logoURL?.publicId} alt={user?.name} />
              <AvatarFallback className="bg-primary dark:bg-primary">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p>{user?.name}</p>
          </div>
        </DialogHeader>
        <form className="h-full flex flex-col gap-8">
          <Select
            onValueChange={(value) => {
              setPost({ ...post, category: value })
            }}
          >
            <SelectTrigger className="border-primary dark:border-primary focus:ring-primary dark:focus:ring-primary">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-backgroundDark_primary dark:border-primary  ">
              <SelectGroup className="dark:bg-backgroundDark_primary p-0">
                {postCategories.map((category, i) => {
                  return (
                    <SelectItem
                      key={i}
                      className="focus:bg-primary dark:focus:bg-primary dark:text-tertiary"
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea
            className="resize-none h-full border-primary dark:border-primary focus:ring-primary dark:focus:ring-primary"
            placeholder="Tape your content here..."
            onChange={(e) => {
              setPost({
                ...post,
                content: e.target.value,
              })
            }}
          />
        </form>
        <DialogFooter className="place-content-start">
          <Button
            type="submit"
            className="bg-secondary dark:bg-primary text-primary dark:text-tertiary text-lg font-medium transition-all ease-in-out duration-300 hover:bg-primary hover:text-secondary dark:hover:bg-tertiary dark:hover:text-primary hover:scale-105 p-2 mt-2 rounded-md"
            onClick={handdlecreatePost}
          >
            Create post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
