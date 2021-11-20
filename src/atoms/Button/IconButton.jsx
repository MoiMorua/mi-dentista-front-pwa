import React from 'react'
import './Button.scss'

const IconButton = (props) => {
    return (
        <button className="IconButton" style={props.customStyle}  onClick={props.onClick}>
            {props.Icon}
        </button>
    )
}

export default IconButton
