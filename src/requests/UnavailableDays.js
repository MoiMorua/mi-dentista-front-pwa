export default {
    saveUnavailableDays: (dates) => {
        return fetch(
                `http://oscarhendrix10.pythonanywhere.com/unabled_date/add`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ date: dates })
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },
    getUnavailableDays: () => {
        return fetch(`http://oscarhendrix10.pythonanywhere.com/unabled_date/get_all`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'token': localStorage.getItem('token')
                }
            }).then((response) => {
                return response.json()
            })
            .catch((error) => {
                console.log(error);
            })
    },
    deleteUnavailableDays: (date) => {
        return fetch(`http://oscarhendrix10.pythonanywhere.com/unabled_date/delete`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                    'Access-Control-Allow-Headers': 'Authorization, Lang',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({ date })
            }).then((response) => {
                return response.json()
            })
            .catch((error) => {
                console.log(error);
            })
    }
}