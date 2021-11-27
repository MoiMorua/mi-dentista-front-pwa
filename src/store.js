import { createStore, combineReducers } from 'redux';

import { GenericReducer } from './reducers/GenericReducer';
import { ServiceReducer } from './reducers/ServiceReducer';
import { UserReducer } from './reducers/UserReducer'
import { AppointmentsReducer } from './reducers/AppointmentReducer'
import { UnavailableDaysReducer } from './reducers/UnavailableDaysReducer'
import { UsersReducer } from './reducers/UsersReducer';


const rootReducer = combineReducers({
    services: ServiceReducer,
    users: UsersReducer,
    generic: GenericReducer,
    user: UserReducer,
    appointments: AppointmentsReducer,
    unavailableDays: UnavailableDaysReducer
})


export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)