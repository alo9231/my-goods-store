import axios from "axios";
import { useLoadingStore } from "@/store/useLoadingStore";

export const api = axios.create({
  // 프록시(/api)를 거치지 않고 직접 API 서버 주소를 사용
  baseURL: 'https://fakestoreapi.com', 
  timeout: 5000,
});

// 기존 인터셉터 로직은 그대로 유지
api.interceptors.request.use((config) => {
  useLoadingStore.getState().setIsLoading(true);
  return config;
});

api.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().setIsLoading(false);
    return response;
  },
  (error) => {
    useLoadingStore.getState().setIsLoading(false);
    return Promise.reject(error);
  }
);