'use client';

import { useLoadingStore } from "@/store/useLoadingStore";
import { Loader2 } from 'lucide-react'; // 아이콘 라이브러리 활용

export default function LoadingSpinner() {
    const { isLoading } = useLoadingStore();

    if(!isLoading) return null; // 로딩 중이 아니면 아무것도 안 보여줌

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Lucide 아이콘에 animate-spin 클래스로 회전 효과 */}
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-slate-600 font-bold animate-pulse">데이터를 불러오는 중...</p>
            </div>
        </div>
    )
}