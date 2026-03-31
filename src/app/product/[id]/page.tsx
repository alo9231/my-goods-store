'use client';

import { useCartStore } from "@/store/useCartStore"; 
import Link from "next/link";
import { api } from '@/api/axiosInstance';
import { use, useEffect, useState } from "react";
import { ChevronLeft, ShoppingCart } from "lucide-react"; // 아이콘 추가

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    // 1. Next.js 15+ 방식대로 params 풀기
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // 2. 스토어에서 addItem 가져오기
    const addItem = useCartStore((state) => state.addItem);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true); // 로딩 시작
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        // ⚠️ 중요: fetchProduct 함수 '밖'에서 호출해야 함
        if (id) {
            fetchProduct();
        }
    }, [id]); // id가 바뀔 때만 딱 한 번 실행

    if (loading) return <div className="p-20 text-center text-slate-500 animate-pulse">상품 정보를 불러오는 중...</div>;

    // 상품이 없을 때 보여줄 예쁜 에러 화면
    if (!product) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h1 className="text-2xl font-bold text-slate-900">앗! 존재하지 않는 상품입니다. 😅</h1>
            <p className="text-slate-500">목록으로 돌아가서 다른 상품을 선택해 주세요.</p>
            <Link href="/" className="px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-slate-800 transition-all">
                홈으로 돌아가기
            </Link>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">
            {/* 3. 뒤로가기 버튼 (목록으로 돌아가기) */}
            <Link href="/" className="inline-flex items-center gap-1 mb-10 text-slate-500 hover:text-black transition-colors group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">목록으로 돌아가기</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {/* 왼쪽: 상품 이미지 : aspect-ratio를 활용해 높이를 고정 */}
                <div className="aspect-square bg-white p-10 rounded-3xl border border-slate-100 shadow-sm flex justify-center items-center aspect-square">
                    {/*  ❌ 기존 코드 */}
                    {/* <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-full object-contain hover:scale-105 transition-transform duration-500" 
                    /> */}
                    {/* // ✅ 수정 코드 DummyJSON */}                    
                    <img src={product.thumbnail || product.image} alt={product.title} 
                        className="max-h-full object-contain hover:scale-105 transition-transform duration-500" 
                    />
                </div>

                {/* 오른쪽: 상품 정보 */}
                <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
                            {product.category}
                        </span>
                        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-3xl font-black text-slate-900">${product.price}</p>
                    </div>

                    <div className="h-[1px] bg-slate-100 w-full" />
                    
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-900 text-lg">상품 설명</h4>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    {/* 장바구니 담기 버튼 */}
                    <button 
                        onClick={() => {
                            addItem({ ...product, quantity: 1 });
                           // alert("장바구니에 담겼습니다! 🛒");
                        }}
                        className="mt-4 flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-100"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        장바구니 담기
                    </button>
                </div>
            </div>
        </div>
    );
}