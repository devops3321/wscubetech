import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_APIBASEURL.replace(/\/+$/, '');

export const viewTestimonials = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/testimonial/view`);
        return response.data;
    } catch (error) {
        console.error("Error Fetching Testimonials", error);
        throw error;
    }
};