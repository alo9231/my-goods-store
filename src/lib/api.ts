import axios from "axios";
import { useLoadingStore } from "@/store/useLoadingStore";

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // '/api'를 지우고 주소 넣음
  timeout: 5000,
});

// 요청 인터셉터 (데이터 요청 직전)
api.interceptors.request.use((config) => {
    // 여기서 로딩 스피너를 켬! (예: Zustand 스토어의 전역 로딩 true)
    // document.body.classList.add('loading-indicator');
    useLoadingStore.getState().setIsLoading(true); // 로딩 시작!
    return config;
})

// 응답 인터셉터 (데이터 도착 후)
api.interceptors.response.use((response) => {
        // 요청 성공 시 로딩 종료
        useLoadingStore.getState().setIsLoading(false); // 로딩 끝!       
        return response;  
    },(error) =>{
        // 요청 실패시에도 로딩 끄기
        useLoadingStore.getState().setIsLoading(false); // 에러 발생해도 로딩 끝내기!
        return Promise.reject(error);
    }
)



export default api;