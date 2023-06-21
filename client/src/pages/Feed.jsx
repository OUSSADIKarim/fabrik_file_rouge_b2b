import { useCompanies } from "../hooks/useCompanies"
import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
} from "@teovilla/shadcn-ui-react"
import { useSendMessage } from "../hooks/useSendMessage"
import { useEffect, useState } from "react"

const Feed = () => {
  const [companies, setCompanies] = useState(null)
  const [message, setMessage] = useState({
    recieverId: "",
    body: "",
  })
  const { data: companiesData, refetch } = useCompanies()
  const { mutate: sendMessage } = useSendMessage()

  useEffect(() => {
    refetch()
    setCompanies(companiesData)
  }, [companiesData, refetch])

  const handdleMessage = (e) => {
    e.preventDefault()
    console.log({ message })
    sendMessage(message, {
      onSuccess: (data) => {
        console.log({ data })
      },
      onError: (err) => {
        console.log({ err })
      },
    })
  }
  return (
    <div>
      {companies?.map((company) => {
        return (
          <div key={company._id}>
            <HoverCard>
              <HoverCardTrigger>{company.name}</HoverCardTrigger>
              <HoverCardContent>
                <Button onClick={handdleMessage}>Message</Button>
                <Input
                  type="text"
                  placeholder="message"
                  onChange={(e) => {
                    setMessage({
                      ...message,
                      recieverId: company._id,
                      body: e.target.value,
                    })
                    console.log({ input: message })
                  }}
                />
              </HoverCardContent>
            </HoverCard>
          </div>
        )
      })}
    </div>
  )
}

export default Feed
