import { createStore, combineReducers } from 'redux';
import { ServiceReducer } from './reducers/ServiceReducer';
import { GenericReducer } from './reducers/GenericReducer';
import { UserReducer } from './reducers/UserReducer'


const rootReducer = combineReducers({
    services: ServiceReducer,
    generic: GenericReducer,
    user: UserReducer
})


export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)