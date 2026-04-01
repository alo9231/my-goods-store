// src/types/product.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;      // FakeStore용
  thumbnail?: string; // DummyJSON용 (반드시 ?를 붙여야함!)
  quantity?: number;  // 장바구니 관리용
  rating?: {
    rate: number;
    count: number;
  };
}