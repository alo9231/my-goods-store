import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // 1. 브라우저에서 /api/products로 요청을 보내면
        source: "/api/:path*",
        // 2. 실제로는 아래 주소로 연결해줍니다 (CORS 회피)
        destination: "https://fakestoreapi.com/:path*",
      },
    ];
  },
};

export default nextConfig;