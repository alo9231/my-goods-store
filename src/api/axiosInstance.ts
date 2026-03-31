import axios from "axios";

export const api = axios.create({
  // 주소가 localhost일 때는 직접 주소를 찌릅니다.
  baseURL: typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'https://fakestoreapi.com' 
    : '/api', 
  timeout: 5000,
});