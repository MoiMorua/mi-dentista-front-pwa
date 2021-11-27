export default { 
    getAllUsers: () => {
        return fetch(
            "http://oscarhendrix10.pythonanywhere.com/user/get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'token': localStorage.getItem('token')
                },
                body: null,
            }
        ).then(response => response.json())
    },

    saveUser: (user, accessCode) => {
        return fetch(
            "http://oscarhendrix10.pythonanywhere.com/user/add", {
                method: "POST",
                headers: new Headers({
                      "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                 name: user.name,
                 lastName: user.lastName,
                 email: user.email,
                 password: user.password,
                 access_code: accessCode,
                 phone: user.phone,
                 role: 'Customer'
             }),
            }
        ).then(response => response.json())
         .catch(err => console.error(err));
    },

    deactivateUser: (user) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/user/desactivate', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(user)
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },

    activateUser: (user) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/user/activate', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Authorization, Lang',
                        'token': localStorage.getItem('token')
                    },
                    body: JSON.stringify(user)
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },

    editUser: (user) => {
        return fetch(
                'http://oscarhendrix10.pythonanywhere.com/user/edit', {
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
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                    })
                }
            ).then((response) => response.json())
            .catch((error) => {
                console.log(error);
            })
    },

    getHistory: (user) => {
        let response = fetch(
            "http://oscarhendrix10.pythonanywhere.com/appointment/get_by_user", {
                method: "POST",
                headers: new Headers({
                      "Content-Type": "application/json",
                      "token": localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    user_id: user.id
                }),
            }
        ).then(response => response.json())
         .catch(err => console.error(err));

        return response;
    }

}