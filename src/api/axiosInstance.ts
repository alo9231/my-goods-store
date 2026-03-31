import axios from "axios";
import { useLoadingStore } from "@/store/useLoadingStore";

export const api = axios.create({
  // 프록시(/api)를 쓰지 않고 실제 주소를 직접 입력합니다.
  baseURL: 'https://dummyjson.com', 
  timeout: 5000,
});

// 인터셉터 로직 (기존과 동일)
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