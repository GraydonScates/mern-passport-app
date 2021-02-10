import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, PASSWORD_RESET } from './types';

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const setErrors = err => {
    return {
        type: GET_ERRORS,
        payload: err.response.data
    };
};

export const setPasswordReset = res => {
    return {
        type: PASSWORD_RESET,
        payload: res.data
    };
};

export const forgotPassword = data => dispatch => {
    dispatch(setErrors({ response: { data: {} } }));
    dispatch(setUserLoading(true));
    axios.post('/api/users/forgotpassword', data).then(res => {
        dispatch(setUserLoading(false));
        dispatch(setPasswordReset(res));
    }).catch(err => {
        dispatch(setUserLoading(false));
        dispatch(setErrors(err));
    });
};

export const registerUser = (userData, history) => dispatch => {
    dispatch(setErrors({ response: { data: {} } }));
    axios.post('/api/users/register', userData).then(res => history.push("/login")).catch(err => dispatch(setErrors(err)));
};

export const loginUser = (userData, history) => dispatch => {
    dispatch(setErrors({ response: { data: {} } }));
    axios.post('/api/users/login', userData).then(res => {
        const { token } = res.data;
        
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);

        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        history.push("/");
    }).catch(err => dispatch(setErrors(err)));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};