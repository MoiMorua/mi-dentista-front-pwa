import { Send } from 'iconsax-react'
import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setFormUser,setFormErrors, selectFormUsers, selectFormErrorsUsers, setModalEmpty,selectServicePage} from '../../../reducers/GenericReducer'
import Input from '../../../atoms/Input/Input'
import '../Forms.scss'

const AddUserForm = ({closeModal, saveUser, editService, incomingData=null, method="add"}) => {
    
    const dispatch = useDispatch()
    const { id, name, lastName, email, phone, password } = useSelector(selectFormUsers)
    const { modal } = useSelector(selectServicePage)
    const { nameError, lastNameError, emailError, phoneError, passwordError } = useSelector(selectFormErrorsUsers)        
    
    let checkErrors = () => {
        let errorsDetected = {}
        let hasErrors = false

        if(name.trim().length<1) {
            errorsDetected.name = 'Proporcione un nombre' 
            hasErrors = true
        }
        else errorsDetected.name = ''
        if(!lastName || lastName<0) {
            errorsDetected.lastName = 'Proporcione un apellido'
            hasErrors = true
        } 
        else errorsDetected.lastName = ''        
        if(!email || email<0) {
            errorsDetected.email = 'Proporcione un correo valido' 
            hasErrors = true
        }
        else errorsDetected.email = ''
        if(!phone || phone<0) {
            errorsDetected.phone = 'Proporcione un número de telefono' 
            hasErrors = true
        }
        else errorsDetected.phone = ''
        dispatch(setFormErrors(errorsDetected))
    }

    let handleChange = (e) => {
        let {name,value} = e.target
        // console.log(name,value)        
        dispatch(setFormUser({[name]:value}))
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if(checkErrors()) return
        if(modal==="ADD") {
            saveUser()
        }else{
            editService()
            
        }        
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
                placeholder="Nombre/s"/>
                {nameError?
                    <label htmlFor="name" className="Form__error">
                        {nameError}
                    </label>
                    :
                null}
            </div>

            <div className="Input-group">                
                <Input 
                value={lastName}
                onChange={(e)=>{                
                    handleChange(e)
                }}
                type="text" 
                name="lastName"
                placeholder="Apellidos"/>
                {lastNameError?
                    <label htmlFor="lastName" className="Form__error">
                        {lastNameError}
                    </label>
                    :
                null}
            </div>

            <div className="Input-group">                
                <Input 
                value={email}
                onChange={(e)=>{                
                    handleChange(e)
                }}
                type="text" 
                name="email"
                placeholder="Correo electrónico"/>
                {emailError?
                    <label htmlFor="email" className="Form__error">
                        {emailError}
                    </label>
                    :
                null}
            </div>
            <div className="Input-group">                
                <Input 
                value={phone}
                onChange={(e)=>{                
                    handleChange(e)
                }}
                type="number" 
                name="phone"
                placeholder="Número de telefono"/>
                {phoneError?
                    <label htmlFor="phone" className="Form__error">
                        {phoneError}
                    </label>
                    :
                null}
            </div>
            {modal==='ADD' ? 
            <div className="Input-group">                
            <Input 
            value={password}
            onChange={(e)=>{                
                handleChange(e)
            }}
            type="password" 
            name="password"
            placeholder="Contraseña"/>
            {passwordError?
                <label htmlFor="password" className="Form__error">
                    {passwordError}
                </label>
                :
            null}
        </div>
        :null
            }
            
           
            <div className="Form__buttons">
                <button className="Form__submit" type="submit">{modal==='ADD'?'Agregar':'Editar'}</button>
                <button className="Form__cancel" onClick={()=>hideModal()}>Cancelar</button>
            </div>
        </form>
    )
}

export default AddUserForm
