import React,{useState,useEffect} from 'react'
import DatePicker from 'react-multi-date-picker';
import UnavailableDaysRequest from '../../requests/UnavailableDays'
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import AddIcon from '../../atoms/icon/AddIcon'
import { BiGhost } from "react-icons/bi"
import {IconButton} from '../../atoms/Button'
import { BiPencil } from 'react-icons/bi'
import { RiDeleteBinLine } from "react-icons/ri"
import {BsCheckAll} from 'react-icons/bs'
import { useSelector,useDispatch } from 'react-redux'
import {initDates,selectUnavailableDays} from '../../reducers/UnavailableDaysReducer'
import { filter } from 'smart-array-filter'
import Input from '../../atoms/Input/Input.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UnavailableDays.scss'

var getDaysArray = function(start, end) {
    // debugger
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

const UnavailableDays = () => {

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    const dispatch = useDispatch()

    const {dateListReducer,dateSearch} = useSelector(selectUnavailableDays)

    const [mode,setMode] = React.useState(true);

    const today = new Date()    

    today.setDate(today.getDate() + 1)

    const [dateList,setDateList] = React.useState([today])
    const [dateListRange,setDateListRange] = React.useState([
        // new DateObject().subtract(4, "days"),
        new Date().setDate(new Date().getDate() - 4),
        new Date().setDate(new Date().getDate() + 4)
    ])

    const [date,setDate] = React.useState(new Date().setDate(new Date().getDate() + 1))

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
                dispatchDates(dateListReducer)
            }
            else if(afterFirstLoad){
                // dispatch(initServices())
                dispatchDates(dateListReducer)
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
    }, [search])
    
    const getDateList = async () => {        
        let {content} = await UnavailableDaysRequest.getUnavailableDays();        

        content = content.map(date=>{                        
            let splitDate = date.date.split('-').reverse()
            date.displayDate = `${splitDate[0]} de ${meses[splitDate[1]-1]} de ${splitDate[2]}`
            
            return date
        })
        
        console.log(content)

        dispatchDates(content)
        setAfterFirstLoad(true)
    }

    const dispatchDates = (list)=>{                
        if(search.length>0){
            dispatch(initDates(
                {
                    dateSearch: filter( list,{keywords:search})
                }
            ))
        }else{
            dispatch(initDates(
                {
                    dateListReducer: list,
                    dateSearch:list
                }
            ))
        }
    }

    useEffect(() => {
        getDateList()
    },[])

    const saveDates = async() => {
        let dates = []        

        if(!mode){
            dates = getDaysArray(new Date(dateListRange[0]),new Date(dateListRange[1]))
            dates = dates.map((v)=>v.toLocaleString().split(' ')[0].split('/').join('-'))
        }else{

            dateList.forEach(date=>{
                console.log(new Date(date))
                console.log(new Date(date).getFullYear())
                console.log(new Date(date).getMonth())
                console.log(new Date(date).getDate())
            })

            dates = dateList.map((v)=>{
                let dateTmp = new Date(v)

                return `${dateTmp.getFullYear()}-${dateTmp.getMonth()}-${dateTmp.getDate()}`
            })
        }             
        // return 
        let {status,message} = await UnavailableDaysRequest.saveUnavailableDays(dates)

        if(status==="ERROR"){
            let date = message.split(' ')[0].split('-')

            toast.warn(`La fecha ${date[2]} de ${meses[date[1]-1]} de ${date[0]} ya está registrada`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else{
            toast.success('Se agregó correctamente', {
                position: "bottom-left",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }

        getDateList()
        setDateList([])
    }

    const deleteDate = async(date) => {
        let response = await UnavailableDaysRequest.deleteUnavailableDays(date)

        if(response.content==="Ok"){
            toast.success('Eliminó el registro correctamente', {
                position: "bottom-left",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });            
        }

        getDateList()

    }

    return (
        <>
            <div className="ServicePage">            
                <header className="Service-header">
                    <h1>Control de días inhábiles</h1>
                </header>            
                <div className="Service-content">
                </div>
                {/* <button onClick={()=>{setMode(!mode)}}>
                    {mode?'Multiple':'Range'}
                </button> */}
                {/* <button onClick={saveDates}>Guardar</button> */}
                <div className="Service-search-add">                
                    <Input placeholder="Buscar" value={search} onChange={({target:{value}})=>{setSearch(value)}}/>                    
                    
                    <div className="Add-date-container">
                        <DatePicker 
                            {...mode?{multiple:true}:{range:true}}      
                            {...mode?{value:dateList}:{value:dateListRange}}                  
                            {...mode?{onChange:setDateList}:{onChange:setDateListRange}}                                                
                            minDate={new Date().setDate(new Date().getDate() + 1)}     
                            plugins={[<DatePanel sort="date" />]}
                        />
                        <IconButton Icon={<AddIcon color="#fff" height="24" width="24"/>} onClick={saveDates}/>
                    </div>
                </div>
                <TableContainer component={Paper} sx={{maxHeight:500}}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>                                
                                <TableCell align="left">Fecha</TableCell>                                
                                <TableCell align="right"></TableCell>                        
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            dateSearch.length>0?
                            dateSearch
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                            .map((row, id) => (                            
                                <TableRow key={id}>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.displayDate}
                                    </TableCell>                                    
                                    <TableCell align="right">                                                                        
                                        <div className="align-center-flex">                                                                                        
                                            <IconButton 
                                                customStyle={{
                                                    backgroundColor: '#ff5d52',
                                                }}
                                                Icon={<RiDeleteBinLine color="#fff" height="60" width="60"/>} 
                                                onClick={()=>{deleteDate(row.date)}}
                                            />                                                
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
                                                search.length>0 && dateListReducer.length>0?
                                                'No se encontraron resultados'
                                                :'No hay días inhabiles registrados'
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
                        count={dateListReducer.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                <ToastContainer
                    position="bottom-left"
                    autoClose={8000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            </div>
        </>
    )
}

export default UnavailableDays
