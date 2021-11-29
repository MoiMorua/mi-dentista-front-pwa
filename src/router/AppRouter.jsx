import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import PrivateRouter from './private/PrivateRoute'
import AssistantRouter from './private/AssistantRoute'
import AdminRouter from './private/AdminRoute'
import LoginRoute from './login/LoginRoute'
import {HomePage,LoginPage,ServicePage, PageNotFound, AddClientPage, AppointmentPage, UnavailableDays,UsersPage } from '../pages'
import {useDispatch} from 'react-redux'

const AppRouter = () => {
    const dispatch = useDispatch()
    // const dispatch = useDispatch();

    return (
        <>
            <Router>
                <Switch>
                    <LoginRoute exact path='/login' component={LoginPage}/>                        
                    {/* <PrivateRouter exact path='/' component={HomePage}/>                                             */}
                    <PrivateRouter rol={[1]} exact path="/servicios" component={ServicePage} />
                    <PrivateRouter rol={[1]} exact path="/dias-inhabiles" component={UnavailableDays} />                    
                    <PrivateRouter rol={[1,2]} exact path="/citas" component={AppointmentPage} />
                    <PrivateRouter rol={[1,2]} exact path="/pacientes" component={UsersPage} />
                    <PrivateRouter rol={[1]} exact path="/empleados" component={UsersPage} />
                    <Route path='/404' component={PageNotFound} />
                    <Redirect from='*' to='/login' />
                </Switch>
            </Router>
        </>        
    )
}

export default AppRouter
