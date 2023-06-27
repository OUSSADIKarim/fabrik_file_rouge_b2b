import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@teovilla/shadcn-ui-react"
import { useState } from "react"
import { useCreatePost } from "../../hooks/apis/posts/useCreatePost"

export const CreatePostForm = ({ setNewPost }) => {
  const postCategories = ["Services and products", "Investement"]

  const [post, setPost] = useState({
    category: "Investement",
    content: "",
  })

  const { mutate } = useCreatePost(setNewPost)

  const handdlecreatePost = (e) => {
    e.preventDefault()
    mutate(post)
  }
  return (
    <form
      className="h-fit flex justify-center items-center"
      onSubmit={handdlecreatePost}
    >
      <div className="flex justify-center mt-10">
        <Select
          onValueChange={(value) => {
            setPost({ ...post, category: value })
          }}
        >
          <SelectTrigger className="w-ful border-primary dark:border-primary focus:ring-primary dark:focus:ring-primary">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="dark:bg-tertiary">
              <SelectLabel className="text-primary dark:text-primary">
                Post Category
              </SelectLabel>
              {postCategories.map((category, i) => {
                return (
                  <SelectItem
                    key={i}
                    className="focus:bg-primary dark:focus:bg-primary dark:text-secondary"
                    value={category}
                  >
                    {category}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        placeholder="message"
        onChange={(e) => {
          setPost({
            ...post,
            content: e.target.value,
          })
        }}
      />
      <Button type="submit">Post</Button>
    </form>
  )
}
