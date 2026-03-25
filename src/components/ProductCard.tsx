// 상품 카드 컴포넌트 만들기

'use client'; // 클라이언트 컴포넌트라고 선언!

import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Star } from 'lucide-react'; // 아이콘 두 개 다 있는지 확인!
import Link from 'next/link';

interface ProductCardProps {
    product : Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    return(
        <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col group'>
            {/* 1. 이미지 영역 (클릭 시 상세페이지 이동) */}
            <Link href={`/product/${product.id}`}>
                <div className="relative w-full p-6 bg-white h-72 cursor-pointer">            
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300' 
                    />
                </div>
            </Link>
            {/* 텍스트 및 아이콘 영역 */}
            <div className='flex flex-col flex-1 p-5 border-t border-slate-50'>
                <span className='mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase'>
                    {product.category}
                </span>

                {/* 2. 제목 (클릭 시 상세페이지 이동) */}
                <Link href={`/product/${product.id}`}>
                    <h3 className='font-bold text-slate-800 line-clamp-2 mb-2 flex-1 leading-snug'>
                        {product.title}
                    </h3>
                </Link>

                {/* 3. 별점 아이콘 영역 (Star 아이콘 및 평점 데이터) */}
                <div className='flex items-center gap-1 mb-4'>
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium text-slate-600'>{product.rating.rate}</span>
                    <span className='text-xs text-slate-400'>({product.rating.count})</span>
                </div>

                {/* 4. 가격 및 장바구니 버튼 (addItem 함수 연결) */}
                <div className='flex items-center justify-between mt-auto'>
                    <span className='text-xl font-bold text-slate-900'>
                        {product.price}
                    </span>
                    <button onClick={() => {
                            addItem(product);
                            alert("장바구니에 담겼습니다! 🛒");
                        }} 
                        className='p-3 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-lg active:scale-95'>
                        <ShoppingCart size={20} />
                    </button>
                </div>

            </div>
        </div>
       
    )
}