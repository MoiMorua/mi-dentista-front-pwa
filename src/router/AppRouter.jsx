import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import PrivateRouter from './private/PrivateRoute'
import LoginRoute from './login/LoginRoute'
import {HomePage,LoginPage,ServicePage, PageNotFound, AddClientPage} from '../pages'
import {useDispatch} from 'react-redux'
import { selectUser,login,logout } from '../reducers/UserReducer'


const AppRouter = () => {
    const dispatch = useDispatch()
    // const dispatch = useDispatch();
  
    React.useEffect(()=>{
        
        if(localStorage.getItem('token')&&localStorage.getItem('expires_on')&&localStorage.getItem('user')&&localStorage.getItem('date')){
            dispatch(login())      
            
        }
        let diff = Math.abs(new Date(localStorage.getItem('date')) - new Date())
        let minutes = Math.floor((diff/1000))
        if(minutes>=1800){
            dispatch(logout())            
            return
        }
        if(!localStorage.getItem('date')){
            dispatch(logout())            
        }
                
    })

    React.useEffect(()=>{
        window.addEventListener('click',(e)=>{

        })

        return ()=>{
            window.removeEventListener('click',(e)=>{})
        }
    })

    return (
        <>
            <Router>
                <Switch>
                    <LoginRoute exact path='/login' component={LoginPage}/>                        
                    <PrivateRouter exact path='/' component={HomePage}/>                                            
                    <PrivateRouter exact path="/servicios" component={ServicePage} />
                    <PrivateRouter exact path="/agregar-cliente" component={AddClientPage} />
                    {/* <PrivateRouter exact path="/citas" component={App} /> */}
                    <Route path='/404' component={PageNotFound} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </Router>
        </>        
    )
}

export default AppRouter
