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
    },
    usersPage: {
        modal: '',
        currentUser: {},
        form: {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
        },
        formErrors: {
            nameError: '',
            lastNameError: '',
            emailError: '',
            phoneError: '',
            passwordError: '',

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
            /*

                USERS   

            */
        case '@generic/set_modal_users':
            return {
                ...state,
                usersPage: {
                    ...state.usersPage,
                    modal: action.payload
                }
            }
        case '@generic/set_current_users':
            return {
                ...state,
                usersPage: {
                    ...state.usersPage,
                    currentUsers: action.payload
                }
            }
        case '@generic/set_form_users':
            return {
                ...state,
                usersPage: {
                    ...state.usersPage,
                    form: {...state.usersPage.form, ...action.payload }
                }
            }
        case '@generic/set_form_errors_users':
            return {
                ...state,
                usersPage: {
                    ...state.usersPage,
                    formErrors: {...state.usersPage.formErrors, ...action.payload }
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

/**
 * 
 * U S E R S
 * 
 */

export const setModalUsersPage = (modal_text) => {
    return {
        type: '@generic/set_modal_users',
        payload: modal_text
    }
}

export const setModalEmptyUsersPage = () => {
    return {
        type: '@generic/set_modal_users',
        payload: ''
    }
}

export const setCurrentUser = (user) => {
    return {
        type: '@generic/set_current_users',
        payload: user
    }
}

export const setFormUser = (form) => {
    return {
        type: '@generic/set_form_users',
        payload: form
    }
}

export const setFormErrorsUser = (formErrors) => {
    return {
        type: '@generic/set_form_errors_users',
        payload: formErrors
    }
}



export const selectServicePage = (state) => state.generic.servicePage
export const selectForm = (state) => state.generic.servicePage.form
export const selectFormErrors = (state) => state.generic.servicePage.formErrors

export const selectUsersPage = (state) => state.generic.usersPage
export const selectFormUsers = (state) => state.generic.usersPage.form
export const selectFormErrorsUsers = (state) => state.generic.usersPage.formErrors