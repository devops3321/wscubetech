import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_APIBASEURL;

export const viewCompanyProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/view-company-profile`);
        return response.data;
    } catch (error) {
        console.error("Error Fetching Company Profile", error);
        throw error;
    }
};