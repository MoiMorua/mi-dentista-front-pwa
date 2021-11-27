import React from 'react'
import SearchInput from '../../atoms/SearchInput/SearchInput'
import './Navbar.scss'
import { ButtonRedirect,IconButton } from '../../atoms/Button'
import {MdOutlineAccountCircle} from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'
import User from '../../requests/User'


const Navbar = (props) => {

    const { location } = props;    
    if (location.pathname.match(/login/) && !User.getToken()) {
        console.log('test')
        return null;
    }
    
    const logout = ()=>{
        localStorage.removeItem('date')
        localStorage.removeItem('user')
        localStorage.removeItem('expires_on')
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        
        <nav className="Navbar">                        
            <ul>                
                <li>
                    <a href="/servicios">Servicios</a>
                </li>
                <li>
                    <a href="/dias-inhabiles">Dias inhabiles</a>
                </li>
                <li>                    
                    <a href="/citas">Citas</a>
                </li>
                <li>
                    <a href="/pacientes">Pacientes</a>
                </li>
                <li>
                    <a href="/empleados">Empleados</a>
                </li>
                <li>
                    <button className="logout-btn" onClick={()=>logout()}>
                        Salir
                        <HiLogout color="#fff"/>
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
