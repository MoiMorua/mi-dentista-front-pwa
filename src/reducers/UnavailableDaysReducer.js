const initialState = {
    dateListReducer: [],
    dateSearch: [],
}

export const UnavailableDaysReducer = (state = initialState, action) => {
    switch (action.type) {
        case '@services/init_date':
            return {...state, ...action.payload }
        default:
            return state
    }
}

export const initDates = (dates) => {
    return {
        type: '@services/init_date',
        payload: dates
    }
}

export const selectUnavailableDays = (state) => state.unavailableDays