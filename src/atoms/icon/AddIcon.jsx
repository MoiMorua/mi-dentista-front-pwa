import React from 'react'

const AddIcon = ({height,width, color}) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            stroke={color}
            fill={color}
            enableBackground="new 0 0 32 32"
            version="1.1"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
        >
        <path d="M28 14H18V4a2 2 0 00-4 0v10H4a2 2 0 000 4h10v10a2 2 0 004 0V18h10a2 2 0 000-4z"></path>
        </svg>
    )
}

export default AddIcon
