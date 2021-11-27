import React from 'react'
import User from '../../requests/User'
import Input from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button'
import { Tooth } from '../../atoms/illustration'
import {useDispatch, useSelector} from 'react-redux'
import { selectUser,login } from '../../reducers/UserReducer'
import './LoginPage.scss'

const LoginPage = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    let [email, setEmail] = React.useState('')
    let [password, setPassword] = React.useState('')

    const Login = async(e) => {
        e.preventDefault()

        let response = await User.login(email, password)
        
        if(response.status) {
            User.storeToken({...response,date: new Date()})
            dispatch(login())
            window.location.href = '/citas'
        }        
        
    }

    return (
        <div className="LoginPage">
            <div className="Login-card">

                <div className="Login-illustration">
                    <Tooth height='100%' width='100%'/>
                </div>
                <div className="Login-form-container">
                    <p className="Login-title">Bienvenido<br/><strong>Inicia sesión.</strong></p>

                    <p className="Login-message">
                        Soy nuevo aquí, <strong><a href="/">quiero registrarme</a></strong>
                    </p>
                    <form onSubmit={Login} className="Login-form">
                        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nombre de usuario"/>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>                
                        <div className="Login-button">
                            <Button text="Ingresar" type="submit"/>                
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default LoginPage
