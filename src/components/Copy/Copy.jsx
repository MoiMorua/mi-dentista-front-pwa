import React, { useEffect } from 'react'
import './Copy.scss'

const Copy = ({text}) => {

    const [displayText, setDisplayText] = React.useState(text)

    const copyToClipboard = async() => {
        navigator.clipboard.writeText(text)
        if(displayText == text){
            setDisplayText('Texto copiado!')
            await new Promise(resolve => setTimeout(resolve, 1000))
            setDisplayText(text)
        }
    }    

    return (
        <button 
        className="Copy"
        onClick={() => {copyToClipboard()}}
        >
            {displayText}
        </button>
    )
}

export default Copy
