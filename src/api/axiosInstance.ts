import axios from "axios";
import { useLoadingStore } from "@/store/useLoadingStore";

// 1. Axios 인스턴스 생성
export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000,
});

/**
 * 2. 요청 인터셉터 (데이터 요청 직전)
 * - Zustand 스토어를 통해 전역 로딩 상태를 true로 변경함
 */
api.interceptors.request.use((config) => {
  useLoadingStore.getState().setIsLoading(true);
  return config;
});

/**
 * 3. 응답 인터셉터 (데이터 도착 후)
 * - 요청이 성공하거나 실패했을 때 모두 로딩 상태를 false로 변경함
 */
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

export default api;