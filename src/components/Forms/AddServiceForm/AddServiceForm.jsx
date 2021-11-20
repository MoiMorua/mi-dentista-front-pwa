import { Send } from 'iconsax-react'
import React,{useState} from 'react'
import Input from '../../../atoms/Input/Input'
import '../Forms.scss'

const AddServiceForm = ({closeModal,saveService,editService,incomingData=null,method="add"}) => {
    
    const [data,setData] = useState({
                                name: incomingData===null?'':incomingData.name,
                                duration: incomingData===null?'':'0'+incomingData.duration[0]+':'+incomingData.duration[1],
                                price: incomingData===null?'':incomingData.price,
                            })
    
    const [errors,setErrors] = useState({
                                name: '',
                                duration: '',
                                price: ''
                            })

    let {name,duration,price} = data
    
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
        setErrors(errorsDetected)        
    }

    let handleChange = (e) => {
        let {name,value} = e.target
        console.log(name,value)
        setData({...data,[name]:value})        
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if(checkErrors()) return


        if(method=="add"){
            saveService(data)
        }else{
            editService(data)
        }
    }

    const hideModal = () => {        
        document.body.style.overflow = 'auto';     
        closeModal()   
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
                {errors.name?
                    <label htmlFor="name" className="Form__error">
                        {errors.name}
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
                name="duration"
                placeholder="Duración (minutos)"/> 
                {errors.duration?
                    <label htmlFor="duration" className="Form__error">
                        {errors.duration}
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
                {errors.price?
                    <label htmlFor="price" className="Form__error">
                        {errors.price}
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
