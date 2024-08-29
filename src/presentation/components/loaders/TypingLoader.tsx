import './TypingLoader.css'

interface TypingLoaderProps {
    className?: string
}

const TypingLoader = ({className}: TypingLoaderProps) => {
  return (
    <div className={`typing ${className}`} >
        <div className="circle scaling"></div>
        <div className="circle scaling"></div>
        <div className="circle scaling"></div>
    </div>
  )
}

export default TypingLoader