import { useEffect, useRef, useState } from "react"
import { useGetAllPosts } from "../hooks/apis/posts/useGetAllPosts"
import { CreatePostForm } from "../components/posts/CreatePostForm"
import PostCard from "./../components/posts/PostCard"
import { useIntersection } from "@mantine/hooks"
import { usePageTransition } from "../hooks/animations/usePageTransition"
import { useErrorBoundary } from "react-error-boundary"

const Feed = () => {
  const [posts, setPosts] = useState(null)
  const [newPost, setNewPost] = useState(null)
  const lastPostRef = useRef(null)

  const animationRef = usePageTransition()
  const { showBoundary } = useErrorBoundary()
  const { data, fetchNextPage, hasNextPage, error } = useGetAllPosts()

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    console.log("1")
    fetchNextPage()
  }, [])

  useEffect(() => {
    console.log("2")
    console.log(lastPostRef)
    if (hasNextPage && entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage])

  useEffect(() => {
    console.log("3")
    setPosts(data?.pages.flatMap((post) => post))
  }, [data])

  useEffect(() => {
    if (newPost) {
      console.log("4")
      setPosts((prev) => {
        return [newPost, ...prev]
      })
    }
  }, [newPost])

  useEffect(() => {
    if (error) {
      showBoundary(error)
    }
  }, [error])

  return (
    <main ref={animationRef} className="w-full">
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
