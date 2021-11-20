import React, { useEffect } from 'react'
import './style.scss'
import Loading from '../../atoms/icon/Loading'
import User from '../../requests/User'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Copy from '../../components/Copy/Copy';

const AddClientPage = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [accessToken, setAccessToken] = React.useState('')    
    
    const COPY_TOKEN_SWAL = withReactContent(Swal)


    const requestAccessToken = async () => {
        setIsLoading(true)

        let response = await User.getAccessToken()
    
        if(response.message === 'Token expired.'){
            User.deleteToken()
            window.location.reload(false);
        }
                
        await new Promise(resolve => setTimeout(resolve, 1000))

        COPY_TOKEN_SWAL.fire({
            title: <p>¡Listo!</p>,
            html: <Copy text={response.access_code}/>,
            confirmButtonText: 'Cerrar',
            textColor: '#fff',
            confirmButtonColor: '#1BD15D',        
        })
        setIsLoading(false)
    }

    return (
        <div className="AddClientPage">
            <header className="AddClient-header">
                <h1>Generar token de acceso</h1>
            </header>    
            {/* <Copy text={"9fbs265"}/> */}
            <div className="AddClient-container">
                <button 
                className={`AddClient-button ${isLoading?'loading':''}`}
                onClick={() => requestAccessToken()}
                disabled={isLoading}
                >
                {
                    isLoading?
                    <Loading height="auto" width="100%" color="#fff"/>
                    :
                    "Generar token"
                }
                </button>
            </div>
        </div>
    )
}

export default AddClientPage
