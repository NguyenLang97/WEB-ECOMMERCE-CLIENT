import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS, LOGOUT_FAIL, LOGOUT_START, LOGOUT_SUCCESS } from './auth.action'
const initialState = {
    isLoading: false,
    isLoggedIn: false,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    infoUser: JSON.parse(localStorage.getItem('infoUser')) || null,
    error: null,
}

const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_START:
        case LOGOUT_START:
            return {
                ...state,
                isLoading: true,
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                currentUser: payload.userID,
                infoUser: payload.user,
            }
        case AUTH_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null,
                isLoading: false,
                error: payload,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: false,
                currentUser: null,
                infoUser: null,
                error: null,
            }
        case LOGOUT_FAIL: {
            return {
                ...state,
                isLoading: false,
                error: payload,
            }
        }
        default:
            return state
    }
}

export default AuthReducer
