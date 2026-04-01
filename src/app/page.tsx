'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/api/axiosInstance';
import gsap from 'gsap'; 
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  // 1. 변수명 통일: selectedCategory로 고정
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isFirstRender = useRef(true); 
  const [categories, setCategories] = useState<string[]>(['all']); // 👉 카테고리 목록을 담을 상태 추가 (초기값은 'all'만 포함)

  // 카테고리 목록과 상품을 가져오는 로직 분리 또는 통합
  useEffect(() => {
    const initData = async () => {
      try{
        // 카테고리 목록 가져오기 (DummyJSON 기준: /products/category-list)
        const catRes = await api.get('/products/category-list');
        if(Array.isArray(catRes.data)){
          // 'all'을 맨 앞에 두고 API에서 받은 카테고리들 합치기
          setCategories(['all', ...catRes.data]);
        }

        // 초기 상품 로드
        fetchProducts('all');
      }catch(error){
        console.log("카테고리 로드 실패 에러~~! ", error);
      }
    };
    initData();
  }, []);

  // 2. 함수명 오타 수정 및 로직 정리
  const fetchProducts = async (category : string) => {
    try {
      setSelectedCategory(category); // 현재 선택된 카테고리 상태 변경

      // API 주소 분기 처리
      const url = category === 'all'
        ? '/products'
        : `/products/category/${category}`;

      const res = await api.get(url);  // 👈 여기서 새로운 데이터를 서버에 요청!
      //console.log("받아온 데이터:", res.data);
      
      // 콘솔에서 확인한 대로 response.data.products를 저장
      if (res.data && Array.isArray(res.data.products)) {
        setProducts(res.data.products);
      }else if (Array.isArray(res.data)){
        setProducts(res.data);
      }      
   
    } catch (error) { // 3. 중괄호 추가
      console.log("상품 로드 실패 👉😶‍🌫️ ", error);
    }
  };



  // ✨ GSAP 애니메이션
  useEffect(() => {
    if (products.length === 0) return;

    if (isFirstRender.current) {
      gsap.set(".product-card", { opacity: 1, y: 0 });
      isFirstRender.current = false; 
      return;
    }

    // 카테고리 변경 시 애니메이션
    gsap.fromTo(".product-card", 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.08, 
        ease: "back.out(1.2)" 
      }
    );
  }, [products]); // 4. products 데이터가 바뀔 때마다 실행되도록 변경

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          내 취업 성공 굿즈 스토어
        </h1>
        
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-12">
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