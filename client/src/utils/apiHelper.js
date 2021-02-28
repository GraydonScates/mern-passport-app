const API = {
    config: {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    token: {},
    forgotPassword: function(data) {
        return fetch('/api/users/forgotpassword', { ...this.config, method: 'POST', body: JSON.stringify(data) });
    },
    registerUser: function(data) {
        return fetch('/api/users/register', { ...this.config, method: 'POST', body: JSON.stringify(data) });
    },
    loginUser: function(data) {
        return fetch('/api/users/login', { ...this.config, method: 'POST', body: JSON.stringify(data) });
    },
    getUser: function() {
        console.log(API.config.headers);
        return fetch(`/api/users/me`, { ...this.config, method: 'GET' });
    }
};

export default API;