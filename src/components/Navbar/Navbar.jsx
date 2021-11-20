import React from 'react'
import SearchInput from '../../atoms/SearchInput/SearchInput'
import './Navbar.scss'
import { ButtonRedirect,IconButton } from '../../atoms/Button'
import {MdOutlineAccountCircle} from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import User from '../../requests/User'


const Navbar = (props) => {

    const { location } = props;

    console.log(location)

    if (location.pathname.match(/login/) && !User.getToken()) {
        console.log('test')
        return null;
    }

    return (
        
        <nav className="Navbar">                        
            <ul>                
                <li>
                    <a href="/servicios">Servicios</a>
                </li>
                <li>
                    <a href="/agregar-cliente">Agregar cliente</a>
                </li>
                <li>
                    <a href="">Citas</a>
                </li>
                <li>
                    <a href="">Mi cuenta</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
