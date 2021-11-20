import React from 'react'
import './Button.scss'

const ButtonRedirect = (props) => {
    return (
        <button className='Button redirect'>
                {props.Icon}
            {/* <a href={props.href}>
                {props.text}
            </a> */}
        </button>
    )
}

export default ButtonRedirect
