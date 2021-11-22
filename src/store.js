import { createStore, combineReducers } from 'redux';
import { ServiceReducer } from './reducers/ServiceReducer';
import { GenericReducer } from './reducers/GenericReducer';


const rootReducer = combineReducers({
    services: ServiceReducer,
    generic: GenericReducer
})


export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)