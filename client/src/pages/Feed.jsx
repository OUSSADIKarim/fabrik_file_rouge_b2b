import { useEffect, useRef, useState } from "react"
import { useGetAllPosts } from "../hooks/apis/posts/useGetAllPosts"
import { CreatePostForm } from "../components/posts/CreatePostForm"
import PostCard from "./../components/posts/PostCard"
import { useIntersection } from "@mantine/hooks"
import { usePageTransition } from "../hooks/animations/usePageTransition"
import { useErrorBoundary } from "react-error-boundary"
import useLogState from "./../hooks/contexts/useLogState"
import { Avatar, AvatarFallback, AvatarImage } from "@teovilla/shadcn-ui-react"
import Loading from "./../components/Loading"
import PostFilters from "../components/posts/PostFilters"

const Feed = () => {
  const [filters, setFilters] = useState({ sortBy: "", category: "" })
  const postCategories = ["Services and products", "Investement"]
  const [posts, setPosts] = useState(null)
  const [newPost, setNewPost] = useState(null)
  const { user } = useLogState()
  const lastPostRef = useRef(null)

  const animationRef = usePageTransition()
  const { showBoundary } = useErrorBoundary()
  const { data, fetchNextPage, hasNextPage, error, isFetchingNextPage } =
    useGetAllPosts(filters)

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  useEffect(() => {
    data.pages = []
    fetchNextPage({ pageParam: 0 })
  }, [fetchNextPage, filters])

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage])

  useEffect(() => {
    setPosts(data?.pages?.flatMap((post) => post))
  }, [data])

  useEffect(() => {
    if (newPost) {
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
    <main
      ref={animationRef}
      className="w-full flex flex-col items-center justify-center bg-backgroundLight dark:bg-secondary"
    >
      <section className="w-full md:w-2/4 flex items-center justify-center gap-2 p-2 md:rounded-xl bg-tertiary dark:bg-backgroundDark_primary">
        <Avatar>
          <AvatarImage src={user?.logoURL?.publicId} alt={user?.name} />
          <AvatarFallback className="bg-primary dark:bg-primary">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CreatePostForm
          setNewPost={setNewPost}
          postCategories={postCategories}
        />
      </section>

      <div className="w-full md:grid md:grid-cols-5">
        <PostFilters
          setFilters={setFilters}
          filters={filters}
          postCategories={postCategories}
          setPosts={setPosts}
        />

        <section className="w-full flex flex-col items-center justify-center gap-8 mt-8 md:col-[2_/_5]">
          {posts?.map((post, i) => {
            return i === posts?.length - 2 ? (
              <PostCard key={i} post={post} innerRef={ref} />
            ) : (
              <PostCard key={i} post={post} />
            )
          })}
          {isFetchingNextPage && <Loading />}
        </section>
      </div>
    </main>
  )
}

export default Feed
