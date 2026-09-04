// ─────────────────────────────────────────────────────────────
//  지도 — 검색엔진에게 "우리 가게에 이런 방들이 있습니다" 라고 알려주는 파일
//  ⑤회차. 이 파일 하나면 /sitemap.xml 주소가 생깁니다.
// ─────────────────────────────────────────────────────────────

import type { MetadataRoute } from "next";

const 사이트주소 = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const 지금 = new Date();
  return [
    { url: `${사이트주소}/`, lastModified: 지금, priority: 1 },
    { url: `${사이트주소}/about`, lastModified: 지금, priority: 0.6 },
  ];
  // /login 은 검색에 뜰 이유가 없어 넣지 않습니다.
}
