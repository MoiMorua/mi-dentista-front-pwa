export default {
    getAppointmentListByPeriod: (start_date,end_date) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/appointment/get_by_period', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',                        
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                            start_date:start_date,
                            end_date:end_date
                        })
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    }
    
}