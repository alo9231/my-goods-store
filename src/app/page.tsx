'use client';

import { useState, useEffect, useRef } from 'react'; // useRef 추가
import gsap from 'gsap'; // gsap 임포트
import { api } from '@/api/axiosInstance';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isFirstRender = useRef(true); // 👈 1. 처음 마운트인지 확인용 Ref

  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

  // 1. 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("데이터 로딩 실패함! 이유 👉👉 ", error);
      }
    };
    fetchProducts();
  }, []);

  // 2. 중요: 상태(State) 대신 변수로 바로 계산 (리액트 경고 해결 비법)
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());


 // ✨ GSAP 애니메이션 (필터 클릭 시에만!)
  useEffect(()=>{
    // 데이터가 아직 없으면 애니메이션 실행 안 함
    if (filteredProducts.length === 0) return;

    // 👈 2. 처음 페이지에 들어왔을 때는 애니메이션 없이 바로 보여주기
    if (isFirstRender.current) {
      gsap.set(".product-card", { opacity: 1, y: 0 });
      isFirstRender.current = false; // 첫 렌더링 이후로는 false로 변경
      return;
    }

    // 👈 3. 이후 카테고리(필터)를 변경했을 때만 애니메이션 실행
    gsap.fromTo(".product-card", 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.08, 
        ease: "back.out(1.2)" // 처음보다 살짝 덜 튀게 조절해서 세련미 추가
      }
    );

  }, [selectedCategory, filteredProducts]); // selectedCategory가 바뀔 때 실행
  
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
              onClick={() => setSelectedCategory(category)}
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

      {/* 필터링된 리스트 출력 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredProducts.map((product) => (
          // 👇 gsap 실행용 class 추가
          <div key={product.id} className='product-card'>
             <ProductCard key={product.id} product={product} />
          </div>         
        ))}
      </div>
    </main>
  );
}