 import {
    REGISTER_USER_REQUEST, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstant";

export const userReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            case LOGIN_USER_REQUEST:
                case LOAD_USER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }
        case REGISTER_USER_SUCCESS:
            case LOGIN_USER_SUCCESS:
                case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }
            case LOGOUT_USER_SUCCESS:
                return{
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                }

            case LOAD_USER_FAIL:
                return{
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }

            case REGISTER_USER_FAIL:
                case LOGIN_USER_FAIL:
                return{
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload
                }
                case LOGOUT_USER_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.payload,
                    }
                case CLEAR_ERRORS:
                    return {
                        ...state,
                        error: null,
                    }
    
        default:
            return state;
    }
}

export const allUsersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
            return{
                ...state,
                loading: true
            }
            case ALL_USER_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    users: action.payload
                }
            case ALL_USER_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload
                }
    
        default:
            return state;
    }
}