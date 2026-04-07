'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/api/axiosInstance';
import gsap from 'gsap'; 
import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  // 1. 변수명 통일: selectedCategory로 고정
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isFirstRender = useRef(true); 
  const containerRef = useRef(null); // ✅ GSAP context용 ref
  const [categories, setCategories] = useState<string[]>(['all']); // 👉 카테고리 목록을 담을 상태 추가 (초기값은 'all'만 포함)

  // 초기 데이터(카테고리 목록) 로드
  useEffect(() => {
    const fetchCategories = async () => {
      try{     
        const catRes = await api.get('/products/category-list');  // 카테고리 목록 가져오기 (DummyJSON 기준: /products/category-list)
        if(Array.isArray(catRes.data)){
          // 'all'을 맨 앞에 두고 API에서 받은 카테고리들 합치기
          setCategories(['all', ...catRes.data]);
        }      
      }catch(error){
        console.log("카테고리 로드 실패 에러~~! ", error);
      }
    };

    fetchCategories();     
    fetchProducts('all'); // 초기 상품 로드
  }, []);

  // 상품 가져오기 함수
  const fetchProducts = async (category : string) => {
    try {
      setSelectedCategory(category); // 현재 선택된 카테고리 상태 변경

      // API 주소 분기 처리
      const url = category === 'all' ? '/products' : `/products/category/${category}`;
      const res = await api.get(url);  // 👈 여기서 새로운 데이터를 서버에 요청!
      //console.log("받아온 데이터:", res.data);      

      // DummyJSON 응답 구조에 맞게 세팅
      const data = res.data.products || res.data;
      setProducts(Array.isArray(data) ? data : []);
   
    } catch (error) { // 3. 중괄호 추가
      console.log("상품 로드 실패 👉😶‍🌫️ ", error);
      setProducts([]); // 에러 시 빈 배열 처리
    }
  };


  // ✨ GSAP 애니메이션
  useEffect(() => {
    if (products.length === 0) return;

    // 첫 렌더링 시에는 애니메이션 없이 즉시 노출 (isFirstRender 활용)
    if (isFirstRender.current) {
      gsap.set(".product-card", { opacity: 1, y: 0 });
      isFirstRender.current = false;
      return;
    }

    // 카테고리 변경 시 실행될 애니메이션
    const ctx = gsap.context(() => {
      gsap.fromTo(".product-card", 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.05, // 살짝 더 빠르게 조정
          ease: "power2.out" 
        }
      );
    }, containerRef);

    return () => ctx.revert(); // 컴포넌트 언마운트 시 정리
  }, [products]); // products 데이터가 바뀔 때마다 실행되도록 변경

  return (
    <main className="min-h-screen bg-slate-50 p-8" ref={containerRef}>
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          내 취업 성공 굿즈 스토어
        </h1>
        
        <div className="max-w-7xl mx-auto items-center flex flex-wrap justify-center gap-2 mt-8 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              // 클라이언트 필터링 대신 서버에 다시 요청하도록 변경
              onClick={() => fetchProducts(category)} // 클릭한 카테고리 데이터 요청
              className={`uppercase px-6 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category === 'all' ? '전체' : category}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
        {products.map((product) => (
          <div key={product.id} className='product-card'>
             <ProductCard product={product} />
          </div>         
        ))}
      </div>
    </main>
  );
}