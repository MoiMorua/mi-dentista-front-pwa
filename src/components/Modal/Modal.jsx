import React,{useState,useEffect} from 'react'
import './Modal.scss'

const Modal = ({show,children,title,closeModal}) => {    
    

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            closeModal()
            hideModal()
          }
        }
        window.addEventListener('keyup', close)

      return () => window.removeEventListener('keyup', close)
    },[])

    useEffect(()  => {
        document.body.style.overflow = 'hidden';
    },[]);

    const hideModal = () => {        
        document.body.style.overflow = 'auto';        
    }    

    return (
        <div className="Modal__container">
            <div className="Modal__main">
                <div className="Modal__header">
                    <h2>{title}</h2>
                </div>
                <div className="Modal__content">
                    {children}
                </div>                
            </div>
        </div>
    )
}

export default Modal