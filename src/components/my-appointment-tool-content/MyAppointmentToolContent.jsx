import React from 'react';
import { Appointments, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import './MyAppointmentToolContent.scss'

const MyAppointmentToolContent = ({ children, appointmentData, classes, ...restProps }) => {
  
  let {user:{id,name,last_name,phone},status} = appointmentData;

  console.log('appointmentData',appointmentData);

  return(
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <div className="MyToolTip">
        {status===0?<p className="appointment__status">Cancelada</p>:''}
        <header>
          <h2>Cliente: {`${name} ${last_name}`}</h2>
        </header>
        <p>
          Teléfono: {phone}
        </p>        
      </div>
    </AppointmentTooltip.Content>
  )
  }
export default MyAppointmentToolContent;