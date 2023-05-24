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
    CLEAR_ERRORS,
} from "../constants/userConstant";
import axios from "axios";

//Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(
            `/api/v1/register`,
            userData, 
            config
        );

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        const config = { data: { "Content Type": "application/json" } }

        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST})

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user})

    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});        
    }

} 

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);
        dispatch({type: LOGOUT_USER_SUCCESS})
    } catch (error) {
        dispatch({type: LOGOUT_USER_FAIL, payload: error.response.data.message})
    }
}

// All Users -Admin
export const allUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USER_REQUEST});

        const {data} = await axios.get(`/api/v1/admin/users`);

        dispatch({type: ALL_USER_SUCCESS, payload: data.users});

    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}