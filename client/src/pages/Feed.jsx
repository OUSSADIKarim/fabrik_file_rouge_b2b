import { useEffect, useRef, useState } from "react"
import { useGetAllPosts } from "../hooks/apis/posts/useGetAllPosts"
import { CreatePostForm } from "../components/posts/CreatePostForm"
import PostCard from "./../components/posts/PostCard"
import { useIntersection } from "@mantine/hooks"

const Feed = () => {
  const [posts, setPosts] = useState(null)
  const [newPost, setNewPost] = useState(null)
  const lastPostRef = useRef(null)

  const { data, fetchNextPage, hasNextPage } = useGetAllPosts()

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    fetchNextPage()
  }, [])

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage])

  useEffect(() => {
    setPosts(data?.pages.flatMap((post) => post))
  }, [data])

  useEffect(() => {
    console.log({ newPost })
    setPosts((prev) => {
      return [newPost, ...prev]
    })
  }, [newPost])

  return (
    <main className="w-full">
      <CreatePostForm setNewPost={setNewPost} />
      {posts?.map((post, i) => {
        return i === posts?.length - 2 ? (
          <PostCard key={i} post={post} innerRef={ref} />
        ) : (
          <PostCard key={i} post={post} />
        )
      })}
    </main>
  )
}

export default Feed
