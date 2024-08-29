import { FormEvent, useState } from 'react'

interface TextMessageBoxProps {
    onSendMessage: (message: string) => void
    placeholder?: string
    disableCorrections?: boolean
}

const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections }: TextMessageBoxProps) => {
    const [message, setMessage] = useState('')

    const handleSendMessage = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        
        if(message.trim() === '') return
        onSendMessage(message)
        setMessage('')
    }

  return (
    <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div className='flex-grow'>
            <div className='relative w-full'>
                <input
                    type='text'
                    className='flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
                    autoFocus
                    name='message'
                    placeholder={placeholder}
                    autoComplete={disableCorrections ? 'on' : 'off'}
                    autoCorrect={disableCorrections ? 'on' : 'off'}
                    spellCheck={disableCorrections ? true : false}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
        </div>

        <div className='ml-4'>
            <button className='btn-primary'>
                <span className='mr-2'>Enviar</span>
                <i className='fas fa-paper-plane'></i>
            </button>
        </div>
    </form>
  )
}

export default TextMessageBox