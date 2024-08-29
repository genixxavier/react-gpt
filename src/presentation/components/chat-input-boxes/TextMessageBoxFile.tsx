import { FormEvent, useRef, useState } from 'react'

interface TextMessageBoxFileProps {
    onSendMessage: (message: string) => void
    placeholder?: string
    disableCorrections?: boolean
    accept?: string
}

const TextMessageBoxFile = ({ onSendMessage, placeholder, disableCorrections, accept }: TextMessageBoxFileProps) => {
    const [message, setMessage] = useState('')
    const [file, setFile] = useState<File | null>()
    const inputFileRef = useRef<HTMLInputElement>(null)

    const handleSendMessage = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        
        if(message.trim() === '') return
        onSendMessage(message)
        setMessage('')
    }

  return (
    <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

        <div className='mr-3'>
            <button className='flex items-center justify-center text-gray-400 hover:text-gray-600' type='button'
            onClick={() => inputFileRef.current?.click()}
            >
                <i className='fa-solid fa-paperclip text-xl'></i>
            </button>

            <input type="file" ref={inputFileRef} accept={accept} onChange={ (e) => setFile(e.target.files?.item(0)) } hidden />
        </div>

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
            <button className='btn-primary w-40 overflow-hidden text-ellipsis whitespace-nowrap' disabled={!file} >
                {
                    file ? <span className='mr-2 '>{file.name}</span> :  <span className='mr-2'>Enviar</span>
                }
                
                <i className='fas fa-paper-plane'></i>
            </button>
        </div>
    </form>
  )
}

export default TextMessageBoxFile