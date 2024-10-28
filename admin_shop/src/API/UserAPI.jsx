import axiosClient from './axiosClient'

const UserAPI = {

    getAllData: () => {
        const url = '/users'
        return axiosClient.get(url)
    },

    getDetailData: (id) => {
        const url = `/users/${id}`
        return axiosClient.get(url)
    },

    postSignUp: (query) => {
        const url = `/users/signup/${query}`
        return axiosClient.post(url)
    },
    deleteUser: async (userId) => {
        try {
            const url = `/users/${userId}`;
            const response = await axiosClient.delete(url);
            return response.data; 
        } catch (error) {
            console.error('Error in UserAPI.deleteUser:', error);
            throw error;
        }
    }

}

export default UserAPI