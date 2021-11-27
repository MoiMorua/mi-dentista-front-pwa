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
import Users from '../../requests/Users'
import User from '../../requests/User'
import Modal from '../../components/Modal/Modal'
import AddIcon from '../../atoms/icon/AddIcon'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BiGhost } from "react-icons/bi"
import {IconButton} from '../../atoms/Button'
import { BiPencil } from 'react-icons/bi'
import { RiDeleteBinLine } from "react-icons/ri"
import {BsCheckAll} from 'react-icons/bs'
import { AddUsersForm } from '../../components/Forms'
import {  m, h } from 'time-convert'
import { useSelector,useDispatch } from 'react-redux'
import {selectUsersList,initUsers} from '../../reducers/UsersReducer'
import { filter } from 'smart-array-filter'
import {selectUsersPage, selectServicePage,setCurrentUser,setModal,setModalEmpty,setFormUser} from '../../reducers/GenericReducer'
import './UsersPage.scss'

const UsersPage = () => {

    const dispatch = useDispatch()
    const {currentUsers,form} = useSelector(selectUsersPage)   
    const {modal} = useSelector(selectServicePage)

    const {usersList ,usersSearch} = useSelector(selectUsersList)    
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
                dispatchUsers(usersList)
            }
            else if(afterFirstLoad){
                // dispatch(initUsers())
                dispatchUsers(usersList)
            }

        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
    }, [search])

    const dispatchUsers = (list)=>{                
        if(search.length>0){
            dispatch(initUsers(
                {
                    usersSearch: filter( list,{keywords:search})
                }
            ))
        }else{
            dispatch(initUsers(
                {
                    usersList: list,
                    usersSearch:list
                }
            ))
        }
    }

    const getUsersList = async ()=>{
        
        let response = await Users.getAllUsers()
        
        response = response.map(user => {            

                return {
                    id: user.id,
                    name: user.user_name,
                    lastName: user.last_name,
                    phone: user.phone,
                    email: user.email,
                    status: user.user_status===1?'Activo':'Inactivo',
                    role: user.user_role
                }
            
        }).filter(user => user.role == 0)
        dispatchUsers(response)
        setAfterFirstLoad(true)
        
    }

    useEffect(() => {
        getUsersList()        
    }, [])

    const saveUser = async () => {
        let data = form
        let accessCode = await User.getAccessToken()
        const response = await Users.saveUser(data, accessCode.access_code)        
        hideModal()
        dispatch(setFormUser({
            name:'',
            lastName:'',
            phone:'',
            email:'',
            password:'',
        }))
        getUsersList()
    }

    const editUser = async () => {      
        const response = await Users.editUser({...currentUsers,...form})        
        hideModal()
        getUsersList()
    }

    const deactivateUser = async (user) => {        
        const response = await Users.deactivateUser(user)

        getUsersList()
    }
    
    const activateUser = async (user) => {        
        const response = await Users.activateUser(user)        
        getUsersList()
    }

    const hideModal = () => {        
        document.body.style.overflow = 'auto';     
        dispatch(setModalEmpty())
    } 

    return (
        <>
            <div className="ServicePage">            
                <header className="Service-header">
                    <h1>Pacientes</h1>
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
                                <TableCell align="right">Apellidos</TableCell>
                                <TableCell align="right">Telefono</TableCell>
                                <TableCell align="right">Correo</TableCell>
                                <TableCell align="right">Estatus</TableCell>
                                <TableCell align="right"></TableCell>                        
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            usersSearch.length>0?
                            usersSearch
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                            .map((row, id) => (                            
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.lastName}
                                    </TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="right">                                                                        
                                        <div className="align-center-flex">
                                            <IconButton 
                                                customStyle={{
                                                    backgroundColor: '#ffc052',
                                                }}
                                                Icon={<BiPencil color="#fff" height="60" width="60"/>} 
                                                onClick={()=>{
                                                    dispatch(setModal('EDIT'))
                                                    dispatch(setCurrentUser(row))
                                                    dispatch(setFormUser({ 
                                                        name: row.name,
                                                        lastName: row.lastName,
                                                        email: row.email,
                                                        phone: row.phone,
                                                    }))
                                                }}
                                            />
                                            {
                                                row.status==='Activo'?
                                                <IconButton 
                                                    customStyle={{
                                                        backgroundColor: '#ff5d52',
                                                    }}
                                                    Icon={<RiDeleteBinLine color="#fff" height="60" width="60"/>} 
                                                    onClick={()=>{deactivateUser({_id:row.id})}}
                                                />
                                                :
                                                <IconButton 
                                                    customStyle={{
                                                        backgroundColor: '#1BD15D',
                                                    }}
                                                    Icon={<BsCheckAll color="#fff" height="60" width="60"/>} 
                                                    onClick={()=>{activateUser({_id:row.id})}}
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
                                                search.length>0 && usersList.length>0?
                                                'No se encontraron resultados'
                                                :'No hay pacientes registrados'
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
                        count={usersList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
            {
                modal ==='ADD' &&(
                <Modal  title='Agregar paciente'>
                    <AddUsersForm  saveUser={saveUser} editService={editUser}/>
                </Modal>)
            }
            {
                modal === 'EDIT' &&(
                <Modal  title='Editar paciente'>
                    <AddUsersForm  saveUser={saveUser} editService={editUser}/>
                </Modal>)
            }
        </>
    )
}

export default UsersPage