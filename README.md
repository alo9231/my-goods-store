# 🛒 My Goods Store (Shopping SPA)
<p align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=GSAP&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
</p>

> **React(Vite)와 TypeScript**를 기반으로 한 인터랙티브 커머스 대시보드입니다.  
> 사용자의 조작에 기분 좋게 반응하는 인터랙션을 구현하고, 안정적인 상태 관리를 통해 실무적인 SPA 구조를 설계했습니다.

## 🔗 프로젝트 링크
- **Live Demo**: [https://my-goods-store.vercel.app/](https://my-goods-store.vercel.app/)

---

## 📑 주요 기능 (Key Features)

### ✅ 실시간 상품 필터링 (Dynamic Filtering)
- **Fake Store API** 연동을 통한 실시간 카테고리 필터링 시스템 구현
- `Zustand` 전역 상태 관리를 통해 탭 전환 시 즉각적인 데이터 동기화 처리

### ✅ 고도화된 인터랙티브 UI (GSAP Animation)
- **Stagger Motion**: 상품 리스트 렌더링 시 시각적 흐름을 부여하는 순차 등장 애니메이션 적용
- **Render Control**: `useRef`를 활용해 페이지 진입 시 불필요한 깜빡임을 제어하고, 필터 동작 시에만 모션이 작동하도록 UX 최적화

### ✅ 장바구니 시스템 (Cart Logic)
- SPA 구조 내에서 장바구니 담기, 상태 유지 및 비어있는 예외 케이스 처리
- Next.js의 `Link` 컴포넌트와 인터랙티브 피드백을 통한 부드러운 페이지 전환

---

## 🛠 기술적 고민 (Problem Solving)

### 1. 초기 렌더링 애니메이션 제어
페이지 이동 후 메인으로 돌아올 때마다 GSAP 애니메이션이 재실행되어 화면이 깜빡이는 현상이 있었습니다. 이를 해결하기 위해 `useRef`로 첫 마운트 여부를 추적하고, 마운트 시점에는 `gsap.set`을, 이후 필터 변경 시에만 `gsap.fromTo`가 작동하도록 로직을 개선하여 사용자 경험을 향상시켰습니다.

### 2. 효율적인 전역 상태 관리
장바구니 정보와 선택된 카테고리를 `Zustand`로 관리하여, 불필요한 Props Drilling을 방지하고 컴포넌트 간 데이터 전달 구조를 단순화했습니다.

---

## 📂 폴더 구조 (Directory Structure)
```text
src/
├── app/              # Next.js App Router (Page, Layout)
├── components/       # UI Components (Product Card, Navbar, etc.)
├── store/            # Zustand State Management
└── types/            # TypeScript Interface Definitions
