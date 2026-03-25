// 상품 카드 컴포넌트 만들기

'use client'; // 클라이언트 컴포넌트라고 선언!

import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Star } from 'lucide-react'; // 아이콘 두 개 다 있는지 확인!
import Link from 'next/link';
import gsap from 'gsap';

interface ProductCardProps {
    product : Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    // 애니메이션과 기능을 합친 핸들러 함수를 만들면 코드가 더 깔끔해잠
    const handleAddToCart = () =>{

        // 장바구니에 아이템 추가 : 타입 에러 해결👉 product 데이터에 quantity: 1을 합쳐서 전달
        addItem({ ...product, quantity: 1 });

        //상단 네비바의 카트 아이콘(.cart-badge)을 튕기게 함
        gsap.fromTo(".cart-badge", 
            { scale: 1 }, 
            { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)" }
        );
        //alert("장바구니에 담겼습니다! 🛒");
        
    }

    return(
        <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col group'>
            {/* 1. 이미지 영역 (클릭 시 상세페이지 이동) : aspect-ratio를 활용해 높이 고정 */}
            <Link href={`/product/${product.id}`}>
                <div className="aspect-square w-full mb-4 bg-slate-50 rounded-xl overflow-hidden cursor-pointer">            
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-300' 
                    />
                </div>
            </Link>
            {/* 텍스트 및 아이콘 영역 */}
            <div className="flex-1 flex flex-col justify-between p-5">
                <span className='mb-2 text-xs font-semibold tracking-wider text-blue-600 uppercase'>
                    {product.category}
                </span>

                {/* 2. 제목 (클릭 시 상세페이지 이동) : 2줄까지만 보이게 고정 (line-clamp)*/}
                <Link href={`/product/${product.id}`}>
                    <h3 className='font-bold text-slate-800 line-clamp-2 mb-2 flex-1 leading-snug h-[2.8rem] line-clamp-2'>
                        {product.title}
                    </h3>
                </Link>

                {/* 3. 별점 아이콘 영역 (Star 아이콘 및 평점 데이터) */}
                <div className='flex items-center gap-1 mb-1'>
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm font-medium text-slate-600'>{product.rating.rate}</span>
                    <span className='text-xs text-slate-400'>({product.rating.count})</span>
                </div>

                {/* 4. 가격 및 장바구니 버튼 (addItem 함수 연결) */}
                <div className='flex items-center justify-between mt-4'>
                    <span className='text-xl font-bold text-slate-900'>
                        {product.price}
                    </span>
                    <button onClick={handleAddToCart} 
                        className='p-3 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-lg active:scale-95'>
                        <ShoppingCart size={20} />
                    </button>
                </div>

            </div>
        </div>
       
    )
}