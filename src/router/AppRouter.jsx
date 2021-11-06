import React from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import PrivateRouter from './private/PrivateRoute'
import {HomePage,LoginPage,ServicePage, PageNotFound} from '../pages'

const AppRouter = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route exact path='/login'>
                        <LoginPage />
                    </Route>                    
                    <PrivateRouter exact path="/servicios" component={ServicePage} />
                    <Route path='/404' component={PageNotFound} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </Router>
        </>        
    )
}

export default AppRouter
