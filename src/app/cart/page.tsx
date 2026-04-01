'use client';

import { useCartStore } from "@/store/useCartStore";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, RotateCcw } from "lucide-react";
import Link from 'next/link';

export default function CartPage() {
  // 스토어에서 상태와 함수들을 가져옴
  const { cart, addQuantity, removeQuantity, deleteItem, clearCart } = useCartStore();
  
  // 총 결제 금액 계산
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0);

  // 전체 삭제 핸들러
  const handleClearCart = () => {
    if(confirm("장바구니를 모두 비우시겠습니까? 🗑️")) {
      clearCart();
    }
  }

  // ✅ 장바구니가 비어있을 때 보여줄 UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">장바구니가 비어 있습니다</h2>
        <p className="text-slate-500 mb-8">원하는 상품을 담고 쇼핑을 계속해보세요!</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            👈 쇼핑하러 가기 👈
          </Link>
      </div>
    ); 
  }
  
  // 장바구니에 상품이 있을 때 보여줄 UI
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">장바구니 🛒</h1>
            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-sm font-bold">
              {cart.length}
            </span>
        </div>
      </div>
      <Link href="/" className="text-sm font-semibold text-blue-600 hover:underline">
        쇼핑 계속하기
      </Link>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">

              {/* 상품 이미지 : aspect-ratio를 활용해 높이를 고정 */}
              <div className="aspect-square w-20 h-20 bg-white rounded-xl border border-slate-100 p-2 flex items-center justify-center shadow-sm">
                {/* ✅ 수정 코드: item.thumbnail을 우선 사용하고, 없으면 item.image 사용 */}
                <img  src={item.thumbnail || item.image}  
                      alt={item.title} className="w-16 h-16 object-contain"
                 />
              </div>
              
              {/* 상품 정보 */}
              <div className="space-y-1">
                <h2 className="font-semibold text-sm line-clamp-1 w-40">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              {/* 수량 조절 버튼 영역 */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button 
                  onClick={() => removeQuantity(item.id)} // 👈 마이너스 연결
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 font-bold">{item.quantity}</span>
                <button 
                  onClick={() => addQuantity(item.id)}    // 👈 플러스 연결
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* 삭제 버튼 */}
              <button 
                onClick={() => deleteItem(item.id)}
                className="text-red-400 hover:text-red-600 p-2"
              >
                <Trash2 size={20} />
              </button>
              
            </div>
          </div>
        ))}
      </div>
      
      {/* 최종 결제 금액 영역 */}
      <div className="mt-12 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl shadow-slate-200">
        <span className="text-lg font-medium text-gray-600">총 결제 금액</span>
        <span className="text-2xl font-black text-blue-600">${totalPrice.toFixed(2)}</span>
        <button onClick={()=> alert("결제하기는 준비중입니다 🥹")}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95">
          결제하기
        </button>

        {/* 전체 삭제 버튼 */}
        <button onClick={handleClearCart}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors"
        >
          <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" />
          장바구니 비우기
        </button>
      </div>

    </div>
  );
}