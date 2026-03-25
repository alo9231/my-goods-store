'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api'; 
import gsap from 'gsap'; 
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  // 1. 변수명 통일: selectedCategory로 고정
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isFirstRender = useRef(true); 

  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  // 2. 함수명 오타 수정 및 로직 정리
  const fetchProducts = async (category : string) => {
    try {
      setSelectedCategory(category);

      // API 주소 분기 처리
      const url = category === 'all'
        ? '/products'
        : `/products/category/${category.toLowerCase()}`;

      const res = await api.get(url);  // 👈 여기서 새로운 데이터를 서버에 요청!
      setProducts(res.data); // 👈 받아온 새로운 데이터로 상태 교체

    } catch (error) { // 3. 중괄호 추가
      console.log("상품 로드 실패 👉😶‍🌫️ ", error);
    }
  };

  // 초기 로딩
  useEffect(() => {
    fetchProducts('all');
  }, []);

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
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category === 'all' ? '전체' : category.toUpperCase()}
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