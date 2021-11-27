import { Send } from 'iconsax-react'
import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Forms.scss'
import {selectUsersPage} from '../../reducers/GenericReducer'
import Users from '../../requests/Users'
import HistoryItem from './HistoryItem'
import { BiGhost } from "react-icons/bi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HistoryList = ({setShowHistory}) => {

    const {currentUsers} = useSelector(selectUsersPage)
    const [history, setHistory] = useState([])
    
    const getHistoryUser = async (user) => {
        const history = await Users.getHistory(user)
        setHistory(history.content)
        
    }

    useEffect(() => {
        getHistoryUser({id: currentUsers.id})
    }, [])

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){            
            hideModal()
            document.body.style.overflow = 'auto';        
          }
        }
        window.addEventListener('keyup', close)

      return () => window.removeEventListener('keyup', close)
    },[])

    const hideModal = () => {        
        setShowHistory(false)             
    } 

    return (
        <div className="Form">
            <div className="listHistory">
                {
                    history.length > 0 ? 
                    history.map((item, index) => {
                        return <HistoryItem item={item} key={index} />
                    })
                    :
                    <div className="no-history">
                        <p>No se encontraron citas</p>
                        <BiGhost color='#252525' size='50px'/>
                    </div>
                    
                }
            </div>
            <div className="Form__buttons">
                <button className="Form__cancel" onClick={()=>hideModal()}>Regresar</button>
            </div>
        </div>
    )
}

export default HistoryList
