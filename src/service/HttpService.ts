import axios from "axios";

const axiosExport = {
    get: async (url: string) => {
        try {
            const response = await axios.get(url);
            return response.data; 
        } catch (error) {
            throw error; 
        }
    },
    post: async (url: string, data: any) => {
        try {
            const response = await axios.post(url, data);
            return response.data; 
        } catch (error) {
            throw error;
        }
    },
    put: async (url: string, data: any) => {
        try {
            const response = await axios.put(url, data);
            return response.data; 
        } catch (error) {
            throw error;
        }
    },
    delete: async (url: string) => {
        try {
            const response = await axios.delete(url);
            return response.data; 
        } catch (error) {
            throw error;
        }
    }
};

export default axiosExport;
