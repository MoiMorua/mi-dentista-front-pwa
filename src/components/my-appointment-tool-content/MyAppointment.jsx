import React from 'react'
import {Appointments} from '@devexpress/dx-react-scheduler-material-ui';
import './MyAppointmentToolContent.scss'

const MyAppointment = ({children, style, ...restProps}) => {    
    return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        ...restProps.data.status ===0?{backgroundColor: '#b8b8b8'}:null                
      }}
    >
        <div className="MyAppointment">
            <p>{restProps.data.status ===0?'Cancelada':''}</p>
        </div>
      {children}
    </Appointments.Appointment>
  )};

export default MyAppointment;