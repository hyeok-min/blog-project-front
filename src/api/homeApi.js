import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring API URL

//조회
export const loginUser = async (user,folder,id) => {
    const response = await axios.post(`${BASE_URL}/login`);
    return response.data;
};