import React from 'react'
import './Button.scss'

const Button = (props) => {
    return (
        <button className="Button">
            {props.Icon?
                props.Icon:null
            }            
            {props.text}
        </button>
    )
}

export default Button
