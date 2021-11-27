import React from 'react'
import './history.css'

const HistoryItem = ({item}) => {
    const  tConvert = (time) => {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
    if (time.length > 1) { 
        time = time.slice (1); 
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
        time[0] = +time[0] % 12 || 12;
    }
    
    return time.join (''); 
    
    }

    var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");

    var date = new Date(item.start_date_time);

    let hour = item.start_date_time.split('T')[1].split(":")
    hour = hour[0] + ":"+ hour[1]

    return (
        <div className="cardService">
            <div>
                <p className="service_name">{item.service.name}</p>
                <p>Fecha: {date.getDate() + " de " + meses[date.getMonth()] + " de " + date.getFullYear() + " " + tConvert(hour)}</p>
                <p>Duracion: {item.service.duration} minutos </p>
                <p>Precio: ${item.service.price} MXN</p>
            </div>
        </div>
    )
}

export default HistoryItem
