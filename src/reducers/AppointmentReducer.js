export const AppointmentsReducer = (state = [], action) => {
    switch (action.type) {
        case '@services/init_appointments':
            return action.payload
        default:
            return state
    }
}

export const initAppointments = (appointments) => {
    return {
        type: '@services/init_appointments',
        payload: appointments
    }
}

export const selectAppointmentList = (state) => state.appointments