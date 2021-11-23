import React from 'react'
import {ViewState,EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler'
import {Scheduler,DayView} from '@devexpress/dx-react-scheduler-material-ui';
import MonthPicker from '@mui/lab/MonthPicker';
import CalendarPicker from '@mui/lab/CalendarPicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CustomTabs from '../../components/Tabs/CustomTabs.jsx'
import Grid from '@mui/material/Grid'
import { es } from 'date-fns/locale';
import './AppointmentPage.scss'

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const AppointmentPage = () => {

    const VALID_HOURS = ['07:00','20:00']
    const CALENDAR_OPTIONS = [
        {
            name:'Hoy'
        },        
        {
            name:'Por día'
        },        
        {
            name:'Mensual'
        },
        {
            name:'Periodo Personalizado'
        }
    ]

    const [calendarType, setCalendarType] = React.useState(0)
    const [date, setDate] = React.useState(new Date());
    const [dateTwo, setDateTwo] = React.useState(new Date());

    const handleCalendarType = (index) => {
        setCalendarType(index)
    }

    return (
        <>
            <div className="AppointmentPage">
                <header className="Service-header">
                    <h1>Citas registradas</h1>
                </header> 
                <CustomTabs options={CALENDAR_OPTIONS} onChange={handleCalendarType}/>
                <div className="DatePicker">
                    <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                        <Grid item xs={12} md={6}>
                            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MonthPicker
                                date={date} 
                                minDate={minDate}
                                maxDate={maxDate}
                                onChange={(date) => setDate(date)}                   
                            />
                        </Grid>
                    </LocalizationProvider>
                </div>
                <main>
                    <Scheduler>
                        <ViewState>
                            currentDate={new Date()}
                        </ViewState>                   
                        <DayView 
                            displayName={new Date().toLocaleDateString('es-MX',{weekday:'long'})}

                        />
                    </Scheduler>                    
                </main>

            </div>
        </>
    )
}

export default AppointmentPage
