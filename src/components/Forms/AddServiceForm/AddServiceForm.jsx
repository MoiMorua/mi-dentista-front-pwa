import { Send } from 'iconsax-react'
import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setForm,setFormErrors, selectForm, selectFormErrors,setModalEmpty} from '../../../reducers/GenericReducer'
import Input from '../../../atoms/Input/Input'
import '../Forms.scss'

const AddServiceForm = ({closeModal,saveService,editService,incomingData=null,method="add"}) => {
    
    const dispatch = useDispatch()
    const { name,duration,price } = useSelector(selectForm)
    const { nameError,durationError,priceError } = useSelector(selectFormErrors)        
    
    let checkErrors = () => {
        let errorsDetected = {}
        let hasErrors = false

        if(name.trim().length<1) {
            errorsDetected.name = 'Proporcione un nombre válido' 
            hasErrors = true
        }
        else errorsDetected.name = ''
        if(!duration || duration<0) {
            errorsDetected.duration = 'Proporcione una duración válida'
            hasErrors = true
        } 
        else errorsDetected.duration = ''        
        if(!price || price<0) {
            errorsDetected.price = 'Proporcione un precio válido' 
            hasErrors = true
        }
        else errorsDetected.price = ''
        dispatch(setFormErrors(errorsDetected))
    }

    let handleChange = (e) => {
        let {name,value} = e.target
        console.log(name,value)        
        dispatch(setForm({[name]:value}))
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if(checkErrors()) return
        saveService()
    }

    const hideModal = () => {        
        dispatch(setModalEmpty())
        document.body.style.overflow = 'auto';             
    } 

    return (
        <form onSubmit={handleSubmit} className="Form">
            <div className="Input-group">                
                <Input 
                value={name}
                onChange={(e)=>{                
                    handleChange(e)
                }}
                type="text" 
                name="name"
                placeholder="Nombre del servicio"/>
                {nameError?
                    <label htmlFor="name" className="Form__error">
                        {nameError}
                    </label>
                    :
                null}
            </div>
            <div className="Input-group">                
                <Input 
                value={duration}
                onChange={(e)=>{                
                    handleChange(e)
                }}
                type="time" 
                format="HH:mm"
                name="duration"
                placeholder="Duración (minutos)"/> 
                {durationError?
                    <label htmlFor="duration" className="Form__error">
                        {durationError}
                    </label>
                    :
                null}               
            </div>
            <div className="Input-group">                
                <Input 
                value={price}
                onChange={(e)=>{                
                    handleChange(e)
                }}
                type="number" 
                name="price"
                placeholder="Precio ($)"/>   
                {durationError?
                    <label htmlFor="price" className="Form__error">
                        {durationError}
                    </label>
                    :
                null}                     
            </div>
            <div className="Form__buttons">
                <button className="Form__submit" type="submit">{method=='add'?'Agregar':'Editar'}</button>
                <button className="Form__cancel" onClick={()=>hideModal()}>Cancelar</button>
            </div>
        </form>
    )
}

export default AddServiceForm
