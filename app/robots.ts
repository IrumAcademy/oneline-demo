// ─────────────────────────────────────────────────────────────
//  출입 안내 — 검색 로봇에게 어디를 봐도 되는지 알려줍니다
//  ⑤회차. /robots.txt 주소가 생깁니다.
// ─────────────────────────────────────────────────────────────

import type { MetadataRoute } from "next";

const 사이트주소 = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login"],
    },
    sitemap: `${사이트주소}/sitemap.xml`,
  };
}
