import axios from 'axios';

const userController = {
    getUser: function() {
        return axios.get(`/api/users/`);
    }
};

export default userController;