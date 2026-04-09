import { Product } from '@/types/product';

export interface CartState {
  cart: Product[];
  addItem: (product: Product) => void;
  addQuantity: (id: number) => void;    // 수량 +
  removeQuantity: (id: number) => void; // 수량 -
  deleteItem: (id: number) => void;     // 삭제
  clearCart: () => void; // 👈 전체 삭제 
}
