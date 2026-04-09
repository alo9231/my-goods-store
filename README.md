# 🛒 My Goods Store

사용자 경험(UX)과 상태 관리 효율성에 집중한 **이커머스 프론트엔드 프로젝트**입니다.

## 🔗 링크
- **Deploy**: [https://my-goods-store.vercel.app/](https://my-goods-store.vercel.app/)

## 🚀 핵심 해결 과정
1. **Zustand 전역 상태 관리**: `persist`를 사용하여 새로고침 시에도 장바구니 데이터 유지 및 Prop Drilling 해결
2. **비즈니스 로직 분리**: API 호출과 상태 변경 로직을 컴포넌트 외부로 분리하여 UI 가독성 확보
3. **타입 시스템 구축**: 도메인별(Product, Cart, Loading) Interface 분리로 유지보수성 및 안정성 강화
4. **사용자 인터랙션**: Axios 인터셉터를 활용한 전역 로딩 처리 및 즉각적인 UI 피드백 구현

## 🛠 기술 스택
- **Framework**: Next.js (App Router), TypeScript
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Network**: Axios

## 📂 폴더 구조
```text
src/
├── api/          # Axios 인스턴스 및 인터셉터 설정
├── app/          # App Router 기반 페이지 (Main, Detail, Cart)
├── components/   # 역할별 컴포넌트 (Common, Layout, Product)
├── store/        # Zustand Stores (Cart, Loading)
├── types/        # 도메인별 타입 정의 (cart.ts, product.ts 등)
└── styles/       # Global CSS & Tailwind Config
