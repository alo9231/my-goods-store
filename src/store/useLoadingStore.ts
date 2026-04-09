import { create } from 'zustand';
import { LoadingState } from '@/types/loading';

export const useLoadingStore = create<LoadingState>(
    (set) => ({
        isLoading: false,
        setIsLoading: (status) => set({ isLoading: status }),
    })
);