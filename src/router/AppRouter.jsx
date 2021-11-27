import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import PrivateRouter from './private/PrivateRoute'
import LoginRoute from './login/LoginRoute'
import {HomePage,LoginPage,ServicePage, PageNotFound, AddClientPage, AppointmentPage, UsersPage} from '../pages'
import {useDispatch} from 'react-redux'
import { selectUser,login,logout } from '../reducers/UserReducer'


const AppRouter = () => {
    const dispatch = useDispatch()
    // const dispatch = useDispatch();

    return (
        <>
            <Router>
                <Switch>
                    <LoginRoute exact path='/login' component={LoginPage}/>                        
                    <PrivateRouter exact path='/' component={HomePage}/>                                            
                    <PrivateRouter exact path="/servicios" component={ServicePage} />
                    <PrivateRouter exact path="/citas" component={AppointmentPage} />
                    <PrivateRouter exact path="/pacientes" component={UsersPage} />
                    <Route path='/404' component={PageNotFound} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </Router>
        </>        
    )
}

export default AppRouter
