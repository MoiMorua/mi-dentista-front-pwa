import Service from '../requests/Service'

const initialState = {
    serviceList: [],
    serviceSearch: [],
}

export const ServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case '@services/init_services':
            return {...state, ...action.payload }
        default:
            return state
    }
}

export const initServices = (services) => {
    return {
        type: '@services/init_services',
        payload: services
    }
}

export const selectServiceList = (state) => state.services