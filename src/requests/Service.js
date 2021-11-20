export default {
    getServiceList: () => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/services/get', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'token': localStorage.getItem('token')
                    },
                    body: null
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },
    saveService: (service) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/services/add', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(service)
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },
    editService: (service) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/services/edit', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(service)
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },
    deactivateService: (service) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/services/desactivate', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(service)
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },
    activateService: (service) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/services/activate', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(service)
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    }
}