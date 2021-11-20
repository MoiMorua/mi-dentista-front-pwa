import React from 'react'
import Dialog from '../Dialog/Dialog'
import './Button.scss'

const DialogButton = (props) => {

    const [open, setOpen] = React.useState(false)

    return (
        
        <div className="DialogButton__container">
            <button className={`DialogButton ${props.simple?'simple':''}`} onClick={()=>setOpen(!open)}>                
                {props.text}
            </button>
            <Dialog show={open} title={props.title}>
                {props.children}
            </Dialog>
        </div>
        
    )
}

export default DialogButton
