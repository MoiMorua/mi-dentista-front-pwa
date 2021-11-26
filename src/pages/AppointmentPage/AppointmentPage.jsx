import React from 'react'
import {ViewState,EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler'
import {Scheduler,AllDayPanel,DayView,WeekView,MonthView,Appointments,AppointmentTooltip, Toolbar,DateNavigator,TodayButton} from '@devexpress/dx-react-scheduler-material-ui';
import CalendarPicker from '@mui/lab/CalendarPicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CustomTabs from '../../components/Tabs/CustomTabs.jsx'
import Grid from '@mui/material/Grid'
import { es } from 'date-fns/locale';
import Appointment from '../../requests/Appointment'
import { useSelector,useDispatch } from 'react-redux'
import { selectAppointmentList,initAppointments} from '../../reducers/AppointmentReducer' 
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import MyAppointmentToolContent from '../../components/my-appointment-tool-content/MyAppointmentToolContent'
import MyAppointment from '../../components/my-appointment-tool-content/MyAppointment.jsx';
import './AppointmentPage.scss'

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const AppointmentPage = () => {

    const dispatch = useDispatch()
    const appointments = useSelector(selectAppointmentList)

    const VALID_HOURS = [7,20]
    
    const CALENDAR_OPTIONS = [                
        {
            name:'Por día'
        },        
        {
            name:'Semanal'
        }
    ]

    const [calendarType, setCalendarType] = React.useState(0)
    const [date, setDate] = React.useState(new Date());    
    const [dateTwo, setDateTwo] = React.useState(new Date());

    const handleCalendarType = (index) => {
        setCalendarType(index)
        handleDateChange(date)
    }

    const getAppointmentList = async (start,end)=>{        
        let response = await Appointment.getAppointmentListByPeriod(start,end)
        console.log({start,end})
        let {content} = response
        content = content.map(el=>{return {
            status: el.status,
            startDate: String(new Date(el.start_date_time)),
            endDate: String(new Date(el.end_date_time)),
            title: el.service,
            user: el.user,
            id: el.id
        }})        
        console.log(response)
        dispatch(initAppointments(content))
    }

    React.useEffect(() => {
        handleDateChange(date)
    },[date,calendarType])


    const handleDateChange = (newDate)=>{        
        setDate(newDate)                
        let dateStart,dateEnd        
        console.log(calendarType)
        if(calendarType===0){
             dateEnd= newDate.toLocaleString().split(' ')[0].split('/').reverse().join('-')
             dateStart= newDate.toLocaleString().split(' ')[0].split('/').reverse().join('-')            
        }else{            
                        
            dateStart = new Date(newDate)

            dateEnd = new Date(newDate)            

            dateStart.setDate(dateStart.getDate()-7)
            
            dateEnd.setDate(dateEnd.getDate()+7)

            dateEnd= dateEnd.toLocaleString().split(' ')[0].split('/').reverse().join('-')
            dateStart= dateStart.toLocaleString().split(' ')[0].split('/').reverse().join('-')                        
        }
        
        getAppointmentList(dateStart,dateEnd)
    }

    return (
        <>
            <div className="AppointmentPage">
                <header className="Service-header">
                    <h1>Citas registradas</h1>
                </header> 
                <CustomTabs options={CALENDAR_OPTIONS} onChange={handleCalendarType}/>                
                <main className="AppointmentDate">
                    
                    <Scheduler
                        data={appointments}
                        locale="es-ES"
                    >
                  
                        <ViewState
                            defaultCurrentDate={date}                            
                            onCurrentDateChange={handleDateChange}
                        />
                                                    
                            
                            {
                                calendarType===0?(<DayView displayName="Miercoleeees" startDayHour={VALID_HOURS[0]} endDayHour={VALID_HOURS[1]}/>)                                
                                :calendarType===1?(<WeekView startDayHour={VALID_HOURS[0]} endDayHour={VALID_HOURS[1]}/>)                                        
                                :null    
                            }
                        <Toolbar onChange={()=>{console.log('change')}}/>
                        <DateNavigator onChange={()=>{console.log('change 2')}}/>
                        <TodayButton />
                        <Appointments appointmentComponent={MyAppointment}/>
                        <AppointmentTooltip contentComponent={MyAppointmentToolContent}/>
                    </Scheduler>                    
                    
                </main>

            </div>
        </>
    )
}

export default AppointmentPage
