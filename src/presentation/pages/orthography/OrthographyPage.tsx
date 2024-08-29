import { useState } from "react"
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases"
import { OrthographyResponse } from "../../../interfaces"

interface Message {
  text: string
  isGpt: boolean
  info?: OrthographyResponse
}

const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((messages) => [...messages, { text: text, isGpt: false }])

    const {ok,message, errors, userScore  } = await orthographyUseCase(text)
    if (!ok) {
      setMessages((prev) => [...prev, { text: 'Cannot do correction', isGpt: true }])
    } else {
      setMessages((prev) => [...prev, { text: message, isGpt: true, info: {errors, userScore, message} }])
    }

    setIsLoading(false)

    //todo: add message from response
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">

          <GptMessage text="Hola, ¿en qué puedo ayudarte hoy?" />
            {
              messages.map((message, index) => (
                message.isGpt ? 
                  <GptOrthographyMessage key={index} {...message.info!} /> :
                  <MyMessage key={index} text={message.text} />
              )) 
            }

          {
            isLoading && <div className="col-start-1 col-end-12 fade-in">
            <TypingLoader />
          </div>
          }
        </div>
      </div>
      
      <TextMessageBox onSendMessage={handlePost} placeholder="Escribe tu mensaje aquí" />
      {/* <TextMessageBoxFile onSendMessage={handlePost} placeholder="Escribe tu mensaje aquí" /> */}
      {/* <TextMessageBoxSelect onSendMessage={handlePost} options={[{id:"1", text:"Holas"}, {id:"2",text:"Mundo"}]} /> */}
    </div>
  )
}

export default OrthographyPage