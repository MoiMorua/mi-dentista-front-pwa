import { createStore, combineReducers } from 'redux';

import { GenericReducer } from './reducers/GenericReducer';
import { ServiceReducer } from './reducers/ServiceReducer';
import { UserReducer } from './reducers/UserReducer'
import { AppointmentsReducer } from './reducers/AppointmentReducer'


const rootReducer = combineReducers({
    services: ServiceReducer,
    generic: GenericReducer,
    user: UserReducer,
    appointments: AppointmentsReducer
})


export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)