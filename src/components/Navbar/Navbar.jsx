import React from 'react'
import SearchInput from '../../atoms/SearchInput/SearchInput'
import './Navbar.scss'
import { ButtonRedirect,IconButton } from '../../atoms/Button'
import {MdOutlineAccountCircle} from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'
import User from '../../requests/User'
import {useHistory} from 'react-router-dom'


const Navbar = (props) => {

    const history = useHistory()

    const [display, setDisplay] = React.useState(true);
    
    React.useEffect(() => {
        // debugger
        // console.log(location.pathname)
        // console.log(localStorage.getItem('token')?'true':'false')
        if (!localStorage.getItem('token')) {
            setDisplay(false);
        }
    }, [])

    
    const logout = ()=>{
        localStorage.removeItem('date')
        localStorage.removeItem('user')
        localStorage.removeItem('expires_on')
        localStorage.removeItem('token')
        // history.push('/login')
        window.location.href = '/login'
    }

    return (
        <>
            {display?
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
            :null
            }
        </>
    )
}

export default Navbar
