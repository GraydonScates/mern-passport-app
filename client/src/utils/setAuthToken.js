import API from './apiHelper';

const setAuthToken = token => {
    if(token) return API.config.headers.Authorization = `${token}`;
    API.config.headers.Authorization = undefined;
};

export default setAuthToken;