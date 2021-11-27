import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper'
import Input from '../../atoms/Input/Input.jsx'
import Service from '../../requests/Service'
import Modal from '../../components/Modal/Modal'
import AddIcon from '../../atoms/icon/AddIcon'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BiGhost } from "react-icons/bi"
import {IconButton} from '../../atoms/Button'
import { BiPencil } from 'react-icons/bi'
import { RiDeleteBinLine } from "react-icons/ri"
import {BsCheckAll} from 'react-icons/bs'
import { AddServiceForm } from '../../components/Forms'
import {  m, h } from 'time-convert'
import { useSelector,useDispatch } from 'react-redux'
import {selectServiceList,initServices} from '../../reducers/ServiceReducer'
import { filter } from 'smart-array-filter'
import {selectServicePage,setCurrentService,setModal,setModalEmpty,setForm} from '../../reducers/GenericReducer'
import './ServicePage.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServicePage = () => {

    const dispatch = useDispatch()
    const {modal,currentService,form} = useSelector(selectServicePage)    

    const {serviceList ,serviceSearch} = useSelector(selectServiceList)    
    const CustomSwal = withReactContent(Swal)        
    const [search, setSearch] = useState('')        
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [afterFirstLoad,setAfterFirstLoad] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(search.length > 0){                
                dispatchServices(serviceList)
            }
            else if(afterFirstLoad){
                // dispatch(initServices())
                dispatchServices(serviceList)
            }

        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
    }, [search])

    const dispatchServices = (list)=>{                
        if(search.length>0){
            dispatch(initServices(
                {
                    serviceSearch: filter( list,{keywords:search})
                }
            ))
        }else{
            dispatch(initServices(
                {
                    serviceList: list,
                    serviceSearch:list
                }
            ))
        }
    }

    const getServiceList = async ()=>{
        
        let response = await Service.getServiceList()
        console.log(response)
        response = response.map(service => {            
            let {duration,format} = service.systemformat[0]
            let [duration_h,duration_m] = duration.split(':')
            duration_m = parseInt(duration_m)
            duration_h = parseInt(duration_h)
            console.log({duration_h,duration_m})
            console.log(duration_h===0)
            return {
                id: service.id,
                duration: "0"+duration,
                displayDuration: 
                    duration_h===0?`${duration_m} minutos`:
                    duration_h>0?`${duration_h} horas 
                        ${
                            duration_m>0?`y ${duration_m} minutos`:''
                        }`:'',
                name: service.name,
                price: service.price,
                estatus: service.estatus===1?'Activo':'Inactivo',
                systemformat: {
                    duration:service.systemformat[0].duration
                },
            }
        })
        
        dispatchServices(response)
        setAfterFirstLoad(true)
    }

    useEffect(() => {
        getServiceList()        
    }, [])

    const saveService = async () => {
        let data = form
        const [hours,minutes] = data.duration.split(':')
        data.duration =  m.from(h,m)(hours,minutes)
        const response = await Service.saveService(data)        
        hideModal()
        toast.success('Servicio registrado con exito', {
            position: "bottom-left",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch(setForm({
            name:'',
            duration:'',
            price:''
        }))
        getServiceList()
    }

    const editService = async () => {        
        const [hours,minutes] = form.duration.split(':')
        form.duration =  m.from(h,m)(hours,minutes)
        const response = await Service.editService({...currentService,...form})        
        toast.success('Servicio editado con exito', {
            position: "bottom-left",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        hideModal()
        getServiceList()
    }

    const deactivateService = async (service) => {        
        const response = await Service.deactivateService(service)

        getServiceList()
    }
    
    const activateService = async (service) => {        
        const response = await Service.activateService(service)        
        getServiceList()
    }

    const hideModal = () => {        
        document.body.style.overflow = 'auto';     
        dispatch(setModalEmpty())
    } 

    return (
        <>
            <div className="ServicePage">            
                <header className="Service-header">
                    <h1>Servicios</h1>
                </header>            
                <div className="Service-search-add">                
                    <Input placeholder="Buscar" value={search} onChange={({target:{value}})=>{setSearch(value)}}/>
                    <IconButton Icon={<AddIcon color="#fff" height="24" width="24"/>} onClick={()=>dispatch(setModal('ADD'))}/>
                </div>
                <TableContainer component={Paper} sx={{maxHeight:500}}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
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
                        {
                            serviceSearch.length>0?
                            serviceSearch
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                            .map((row, id) => (                            
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.displayDuration}
                                    </TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.estatus}</TableCell>
                                    <TableCell align="right">                                                                        
                                        <div className="align-center-flex">
                                            <IconButton 
                                                customStyle={{
                                                    backgroundColor: '#ffc052',
                                                }}
                                                Icon={<BiPencil color="#fff" height="60" width="60"/>} 
                                                onClick={()=>{
                                                    dispatch(setModal('EDIT'))
                                                    dispatch(setCurrentService(row))
                                                    dispatch(setForm({ 
                                                        name:row.name,
                                                        duration:'0'+row.systemformat.duration,
                                                        price:row.price
                                                    }))
                                                }}
                                            />
                                            {
                                                row.estatus==='Activo'?
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
                                            {
                                                search.length>0 && serviceList.length>0?
                                                'No se encontraron resultados'
                                                :'No hay servicios registrados'
                                            }
                                            <BiGhost color='#252525' size='24px'/>
                                        </p>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>            
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={serviceList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
            {
                modal ==='ADD' &&(
                <Modal  title='Agregar servicio'>
                    <AddServiceForm  saveService={saveService} editService={editService}/>
                </Modal>)
            }
            {
                modal === 'EDIT' &&(
                <Modal  title='Editar servicio'>
                    <AddServiceForm  saveService={saveService} editService={editService}/>
                </Modal>)
            }
            <ToastContainer
                position="bottom-left"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default ServicePage