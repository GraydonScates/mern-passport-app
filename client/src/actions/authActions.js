import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, PASSWORD_RESET } from './types';
import API from '../utils/apiHelper';

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
        payload: err
    };
};

export const setPasswordReset = res => {
    return {
        type: PASSWORD_RESET,
        payload: res
    };
};

export const forgotPassword = userData => async dispatch => {
    dispatch(setErrors({}));
    dispatch(setUserLoading(true));
    try{
        const res = await API.forgotPassword(userData);
        const data = res.json();
        console.log(data);
        if(res.ok){
            dispatch(setUserLoading(false));
            dispatch(setPasswordReset(data));
        }else{

        }
    }catch(err){
        dispatch(setUserLoading(false));
        dispatch(setErrors(err));
    }
};

export const registerUser = (userData, history) => async dispatch => {
    dispatch(setErrors({}));
    try{
        const res = await API.registerUser(userData);
        const data = await res.json();
        console.log(data);
        if(res.ok){
            history.push("/login");
        }else{
            dispatch(setErrors(data));
        }
    }catch(err) {
        dispatch(setErrors(err));
    }
};

export const loginUser = (userData, history) => async dispatch => {
    dispatch(setErrors({}));
    try{
        const res = await API.loginUser(userData);
        const data = await res.json();
        console.log(data);
        if(res.ok){
            const { token } = data;
            
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push("/");
        }else{
            dispatch(setErrors(data));
        }
    }catch(err){
        dispatch(setErrors(err));
    }
};

export const logoutUser = history => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);

    dispatch(setCurrentUser({}));
    history.push("/");
};