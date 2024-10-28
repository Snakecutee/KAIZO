import axiosClient from './axiosClient'

const HistoryAPI = {

    getHistoryAPI: (query) => {
        const url = `/histories${query}`
        return axiosClient.get(url)
    },

    getDetail: (id) => {
        const url = `/histories/${id}`
        return axiosClient.get(url)
    },

    getAll: () => {
        const url = '/histories/all'
        return axiosClient.get(url)
    },
    updateStatus: async (id, { status, delivery }) => {
        const url = `/histories/${id}`;
        return axiosClient.put(url, { status, delivery }); 
    },
    getHistory: async () => {
        try {
            const response = await axios.get('/api/history'); 
            return response.data;
        } catch (error) {
            console.error('Error fetching history data', error);
            return [];
        }
    },
   

}

export default HistoryAPI