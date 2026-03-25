import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number; // 수량은 필수값으로 설정
}

interface CartState {
  cart: Product[];
  addItem: (product: any) => void;
  addQuantity: (id: number) => void;    // 수량 +
  removeQuantity: (id: number) => void; // 수량 -
  deleteItem: (id: number) => void;     // 삭제
  clearCart: () => void; // 👈 전체 삭제 
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  
  // 장바구니 담기
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
}));