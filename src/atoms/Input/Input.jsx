import React from 'react'
import './Input.scss'

const Input = (props) => {


    

    return (
        <div className='Input'>
            {props.hasLabel ?
                <label htmlFor="">{props.labelTitle}</label>
            : 
                null
            }            
            <input {...props}/>
        </div>
    )
}

export default Input