import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {selectServicePage,setModalEmpty} from '../../reducers/GenericReducer'
import './Modal.scss'

const Modal = ({show,children,title,closeModal}) => {    
    
    const dispatch = useDispatch()
    const modal = useSelector(selectServicePage)

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){            
            dispatch(setModalEmpty())
            document.body.style.overflow = 'auto';        
          }
        }
        window.addEventListener('keyup', close)

      return () => window.removeEventListener('keyup', close)
    },[])

    useEffect(()  => {
        document.body.style.overflow = 'hidden';
    },[]);    

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