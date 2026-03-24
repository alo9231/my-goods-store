'use client';

import { useCartStore } from '@/store/useCartStore';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link'; // 👈 Link를 꼭 임포트해야 함!

export default function cartPage () {
    const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

    // 총 가격 계산
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

   if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500 text-lg">장바구니가 비어 있습니다.</p>
        
        {/* 👇 2. 이 부분을 Link 태그로 감싸야함! */}
        <Link href="/" 
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

    return(
        <main className='max-w-4xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <div className='flex justify-between items-end mb-8'>
                <h1 className='text-3xl font-bold text-slate-900'>내 장바구니</h1>
                <button onClick={clearCart} className='text-sm text-slate-400 hover:text-red-500 transition-colors'>
                    전체 삭제
                </button>
            </div>

            <div className='space-y-4'>
                {
                    cart.map((item) =>(
                        <div key={item.id} className='flex items-center gap-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow'>
                            <img src={item.image} alt={item.title} className='w-20 h-20 object-contain' />

                            <div className='flex-1 min-w-0'>
                                <h3 className='font-bold text-slate-800 truncate'>{item.title}</h3>
                                <p className='text-blue-600 font-bold mt-1'>{item.price}</p>
                            </div>      

                            {/* 수량 조절 버튼 */}
                            <div className='flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100'>
                                <button onClick={()=>{
                                    if(item.quantity > 1){
                                        // 수량 감소 로직 (나중에 store 보완 시 적용 가능)
                                        // 현재는 편의상 1개면 삭제, 그 이상이면 로직 추가 가능
                                    }
                                }} className='p-1 text-slate-400 hover:text-slate-600 transition-colors '
                                >
                                    <Minus size={16}></Minus>                                    
                                </button>
                                <span className='font-bold text-slate-700 min-w-[20px] text-center'>{item.quantity}</span>
                                <button onClick={()=> addToCart(item) } 
                                        className='p-1 text-slate-400 hover:text-blue-600 transition-colors'
                                >
                                    <Plus size={16}></Plus>
                                </button>
                            </div>

                            <button onClick={()=>{ removeFromCart(item.id)}}
                                    className='p-2 text-slate-300 hover:text-red-500 trasition-colors'
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className='mt-10 p-8 bg-slate-900 rounded-3xl text-white flex items-center justify-between shadow-2xl'>
                <div>
                    <p className='text-slate-400 text-sm mb-1 font-medium'>총 결제 예정 금액</p>
                    <p className='text-4xl font-black tracking-tight'>{totalPrice.toFixed(2)}</p>
                </div>
                <button onClick={()=> alert("결제 시스템은 준비중 입니다! 😊")}
                        className='bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20'
                >결제하기</button>
            </div>
        </main>
    )


}