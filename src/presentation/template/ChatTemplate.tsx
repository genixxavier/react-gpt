import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../components"

interface Message {
  text: string
  isGpt: boolean
}

const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (message: string) => {
    setIsLoading(true)
    setMessages((messages) => [...messages, { text: message, isGpt: false }])

    //toto: handle post
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
                  <GptMessage key={index} text='This is OpenAI' /> :
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
    </div>
  )
}

export default ChatTemplate