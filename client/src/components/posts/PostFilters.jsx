import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@teovilla/shadcn-ui-react"

const PostFilters = ({ setFilters, postCategories }) => {
  const sortByDateOptions = [
    { title: "Recent", value: "desc" },
    { title: "oldest", value: "asc" },
  ]

  return (
    <section className="w-full">
      <Select
        onValueChange={(value) => {
          setFilters((prev) => {
            return { ...prev, sortBy: value }
          })
        }}
      >
        <SelectTrigger className="border-primary dark:border-primary focus:ring-primary dark:focus:ring-primary">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="dark:bg-backgroundDark_primary dark:border-primary  ">
          <SelectGroup className="dark:bg-backgroundDark_primary p-0">
            {sortByDateOptions.map((option, i) => {
              return (
                <SelectItem
                  key={i}
                  className="focus:bg-primary dark:focus:bg-primary dark:text-tertiary"
                  value={option.value}
                >
                  {option.title}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          setFilters((prev) => {
            return { ...prev, category: value }
          })
        }}
      >
        <SelectTrigger className="border-primary dark:border-primary focus:ring-primary dark:focus:ring-primary">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="dark:bg-backgroundDark_primary dark:border-primary  ">
          <SelectGroup className="dark:bg-backgroundDark_primary p-0">
            {postCategories.map((option, i) => {
              return (
                <SelectItem
                  key={i}
                  className="focus:bg-primary dark:focus:bg-primary dark:text-tertiary"
                  value={option}
                >
                  {option}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  )
}

export default PostFilters
