'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  // 스토어에서 cart 배열을 가져옵니다.
  const cart = useCartStore((state) => state.cart);
  
  // 총 개수 계산 (cart가 undefined일 경우를 대비해 기본값 [] 설정)
  const totalItems = (cart || []).reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black text-slate-900 tracking-tighter">
          GOODS <span className="text-blue-600">STORE</span>
        </Link>

        <Link href="/cart" className='relative cursor-pointer group p-2'>
          <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}