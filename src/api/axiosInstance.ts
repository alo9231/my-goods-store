import axios from "axios";

export const api = axios.create({
    baseURL : 'https://fakestoreapi.com', // 무료 가짜 API 
    timeout : 5000,
})