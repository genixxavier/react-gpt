
interface GptOrthographyMessageProps {
  userScore: number
  errors: string[]
  message: string
}

const GptOrthographyMessage = ({userScore, errors, message}: GptOrthographyMessageProps) => {
  return (
    <div className='col-start-1 col-end-9 p-3 rounded-lg'>
        <div className='flex flex-row items-start'>
            <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
                G
            </div>
            <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'>
               <h3 className="text-3xl">Score: {userScore}%</h3>
               <p>{message}</p>

               {
                    errors.length > 0 ? (
                        <div className="mt-2">
                            <h4 className="text-2xl">Errores:</h4>
                            <ul>
                                {
                                    errors.map( (error, index) => (
                                        <li key={index}>{error}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    )
                    : <p>Not found errors</p>
               }
            </div>
        </div>
    </div>
  )
}

export default GptOrthographyMessage