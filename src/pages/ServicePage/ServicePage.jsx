import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { BiGhost } from "react-icons/bi"
import './ServicePage.scss'
import Input from '../../atoms/Input/Input.jsx'
import Service from '../../requests/Service'
import {IconButton,DialogButton} from '../../atoms/Button'
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Modal from '../../components/Modal/Modal'
import AddIcon from '../../atoms/icon/AddIcon'
import Dialog from '../../atoms/Dialog/Dialog'
import { BiPencil } from 'react-icons/bi'
import { RiDeleteBinLine } from "react-icons/ri"
import {BsCheckAll} from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AddServiceForm } from '../../components/Forms'
import { ms, s, m, h, d } from 'time-convert'


const ServicePage = () => {

    const [serviceList, setServiceList] = useState([])
    const [search, setSearch] = useState('')    
    const [editMode, setEditMode] = useState(false)
    const [currentService , setCurrentService] = useState(null)
    const CustomSwal = withReactContent(Swal)

    const [showAddModal, setShowAddModal] = useState(false)

    const getServiceList = async ()=>{
        let response = await Service.getServiceList()
        
        response = response.map(service => {            
            let {duration} = service
            // console.log(duration)
            if(duration>=60){
                service.duration =  m.to(h,m)(duration)
            }else{
                service.duration =  [0,duration]
            }
            console.log(service.duration)
            return service
        })

        setServiceList(response)
    }

    useEffect(() => {
        getServiceList()
    }, [])

    const saveService = async (service) => {
        console.log(service)        
        const [hours,minutes] = service.duration.split(':')
        service.duration =  m.from(h,m)(hours,minutes)
        const response = await Service.saveService(service)
        console.log(response)        
        hideModal()
        getServiceList()
    }

    const editService = async (service) => {
        console.log(service)        
        const response = await Service.editService({...currentService,...service})
        console.log(response)
        hideModal()
        getServiceList()
    }

    const deactivateService = async (service) => {        
        const response = await Service.deactivateService(service)
        console.log(response)
        getServiceList()
    }
    
    const activateService = async (service) => {        
        const response = await Service.activateService(service)
        console.log(response)
        getServiceList()
    }

    const hideModal = () => {        
        document.body.style.overflow = 'auto';     
        setShowAddModal(false)
        setEditMode(false)
        setCurrentService(null)
    } 

    return (
        <>
            <div className="ServicePage">            
                <header className="Service-header">
                    <h1>Servicios</h1>
                </header>            
                <div className="Service-search-add">                
                    <Input placeholder="Buscar" value={search} onChange={({target:{value}})=>{setSearch(value)}}/>
                    <IconButton Icon={<AddIcon color="#fff" height="24" width="24"/>} onClick={()=>setShowAddModal(true)}/>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Duración</TableCell>
                                <TableCell align="right">Precio&nbsp;(MXN)</TableCell>
                                <TableCell align="right">Estado</TableCell>
                                <TableCell align="right"></TableCell>                        
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {serviceList.length>0?
                            serviceList.map((row, id) => (                            
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.duration[0]==0?`${row.duration[1]} minutos`:`${row.duration[0]} horas ${row.duration[0]<0?`y ${row.duration[1]} minutos`:''} `}
                                    </TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.estatus==1?'Activo':'Inactivo'}</TableCell>
                                    <TableCell align="right">                                                                        
                                        <div className="align-center-flex">
                                            <IconButton 
                                                customStyle={{
                                                    backgroundColor: '#ffc052',
                                                }}
                                                Icon={<BiPencil color="#fff" height="60" width="60"/>} 
                                                onClick={()=>{
                                                    setEditMode(true)
                                                    setCurrentService(row)
                                                }}
                                            />
                                            {
                                                row.estatus==1?
                                                <IconButton 
                                                    customStyle={{
                                                        backgroundColor: '#ff5d52',
                                                    }}
                                                    Icon={<RiDeleteBinLine color="#fff" height="60" width="60"/>} 
                                                    onClick={()=>{deactivateService({_id:row.id})}}
                                                />
                                                :
                                                <IconButton 
                                                    customStyle={{
                                                        backgroundColor: '#1BD15D',
                                                    }}
                                                    Icon={<BsCheckAll color="#fff" height="60" width="60"/>} 
                                                    onClick={()=>{activateService({_id:row.id})}}
                                                />
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                                )
                            )
                            :
                            (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <p className="no-service-available">
                                            No hay servicios registrados
                                            <BiGhost color='#252525' size='24px'/>
                                        </p>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>            
            </div>
            {
                (showAddModal || editMode) &&(
                <Modal show={true} title={`${editMode?'Editar':'Agregar'} servicio`} closeModal={hideModal}>
                    <AddServiceForm method={editMode?'edit':'add'} {...currentService?{incomingData:currentService}:{}} saveService={saveService} editService={editService} closeModal={hideModal}/>
                </Modal>)
            }
        </>
    )
}

export default ServicePage