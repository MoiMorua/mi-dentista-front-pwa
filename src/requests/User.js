export default {

    login: (email, user_password) => {

        return fetch(
            "http://oscarhendrix10.pythonanywhere.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    email,
                    user_password
                }),
            }

        ).then(response => response.json())

    },
    storeToken: ({ user, token, expires_on }) => {
        localStorage.setItem('user', user)
        localStorage.setItem('token', token)
        localStorage.setItem('expires_on', expires_on)
    },
    deleteToken: () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('expires_on')
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    getAccessToken: () => {
        return fetch(
            "http://oscarhendrix10.pythonanywhere.com/access_code/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'token': localStorage.getItem('token')
                },
                body: null,
            }
        ).then(response => response.json())
    },

}