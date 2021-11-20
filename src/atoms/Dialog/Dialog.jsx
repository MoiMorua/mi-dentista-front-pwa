import React, { useEffect, useRef } from 'react'
import './Dialog.scss'

const Dialog = ({title,show=false,children}) => {

    let dialog = useRef(null)

    const handleClickOutside = (event) => {
        if (dialog.current && !dialog.current.contains(event.target)) {
            show=false
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      });

    if(!show) return null

    return (
        <div className="Dialog" ref={dialog}>
            <header className="Dialog__header">
                <h2>{title}</h2>
            </header>
            {children}
        </div>
    )
}

export default Dialog
