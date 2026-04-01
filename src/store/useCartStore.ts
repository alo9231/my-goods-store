import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. 미들웨어 임포트


interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  thumbnail?: string;
  quantity: number; // 수량은 필수값으로 설정
}

interface CartState {
  cart: Product[];
  addItem: (product: Product) => void;
  addQuantity: (id: number) => void;    // 수량 +
  removeQuantity: (id: number) => void; // 수량 -
  deleteItem: (id: number) => void;     // 삭제
  clearCart: () => void; // 👈 전체 삭제 
}

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
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      // 수량 증가 (+)
      addQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),

      // 수량 감소 (-)
      removeQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1 } 
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