// 네비바 만들기

'use client'; // 클라이언트 컴포넌트라고 선언!

import Link from 'next/link'; // 👈 Link가 꼭 있어야 함!
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  // 1. 스토어에서 장바구니 데이터를 가져옵니다.
  const cart = useCartStore((state) => state.cart);
  
  // 2. 담긴 상품들의 총 개수를 계산합니다.
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 영역 */}
        <Link href="/" className="text-xl font-black text-slate-900 tracking-tighter">
          GOODS <span className="text-blue-600">STORE</span>
        </Link>

        
        
        {/* 장바구니 아이콘 영역 */}
        <Link href="/cart" className='relative cursor-pointer group p-2'>
            <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
          
            {/* 상품이 있을 때만 숫자를 보여줍니다 */}
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {totalItems}
                </span>
            )}
        </Link>
      </div>
    </nav>
  );
}