// API/UserAPI.js

import UserAPI from '../API/UserAPI';
const UserAPI = {
    getDetailData: async (userId) => {
        // Mockup fetching from server
        const response = await fetch(`/api/user/${userId}`);
        return await response.json();
    },
    updateUserData: async (userId, updatedData) => {
        // Mockup for updating user data
        const response = await fetch(`/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        return await response.json();
    }
};

export default UserAPI;
