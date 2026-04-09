import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. 미들웨어 임포트
import { CartState } from '@/types/cart';



// 1. 여기에 persist((set) => ({ ... }), { name: '...' }) 구조로 감싸야 함
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      
      // 장바구니 담기 : (기존에 있으면 수량만 올리거나, 없으면 새로 추가)
      addItem: (product) => set((state) => {
        const isExist = state.cart.find((item) => item.id === product.id);
        if (isExist) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item // ✅ (item.quantity || 0) 추가 - item.quantity가 만약 비어있더라도(undefined), 0을 기본값으로 사용
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      // 수량 증가 (+)
      addQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        ),
      })),

      // 수량 감소 (-)
      removeQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id && (item.quantity || 0) > 1 
            ? { ...item, quantity: (item.quantity || 0) - 1 } 
            : item
        ),
      })),

      // 상품 삭제
      deleteItem: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      // 여기가 장바구니 로컬 스토리지 설정값이 들어가는 위치!
      name: 'shopping-cart-storage', 
    }
  )
);