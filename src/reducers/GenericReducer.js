import Service from '../requests/Service'

const initialState = {
    servicePage: {
        modal: '',
        currentService: {},
        form: {
            name: '',
            price: '',
            duration: '',
        },
        formErrors: {
            nameError: '',
            priceError: '',
            durationError: '',

        }
    }
}

export const GenericReducer = (state = initialState, action) => {
    switch (action.type) {
        case '@generic/set_modal':
            return {
                ...state,
                servicePage: {
                    ...state.servicePage,
                    modal: action.payload
                }
            }
        case '@generic/set_current_service':
            return {
                ...state,
                servicePage: {
                    ...state.servicePage,
                    currentService: action.payload
                }
            }
        case '@generic/set_form':
            return {
                ...state,
                servicePage: {
                    ...state.servicePage,
                    form: {...state.servicePage.form, ...action.payload }
                }
            }
        case '@generic/set_form_errors':
            return {
                ...state,
                servicePage: {
                    ...state.servicePage,
                    formErrors: {...state.servicePage.formErrors, ...action.payload }
                }
            }
        default:
            return state
    }
}

export const setModal = (modal_text) => {
    return {
        type: '@generic/set_modal',
        payload: modal_text
    }
}

export const setModalEmpty = () => {
    return {
        type: '@generic/set_modal',
        payload: ''
    }
}

export const setCurrentService = (service) => {
    return {
        type: '@generic/set_current_service',
        payload: service
    }
}

export const setForm = (form) => {
    return {
        type: '@generic/set_form',
        payload: form
    }
}

export const setFormErrors = (formErrors) => {
    return {
        type: '@generic/set_form_errors',
        payload: formErrors
    }
}



export const selectServicePage = (state) => state.generic.servicePage
export const selectForm = (state) => state.generic.servicePage.form
export const selectFormErrors = (state) => state.generic.servicePage.formErrors