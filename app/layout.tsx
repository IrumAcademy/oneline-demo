import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const 사이트주소 = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const 사이트이름 = process.env.NEXT_PUBLIC_SITE_NAME ?? "오늘의 한 줄";

// ⑤회차 · 간판에 뭐라고 쓸지 —
// 검색 결과와 카톡 링크에 보이는 글자가 전부 여기서 나옵니다.
export const metadata: Metadata = {
  metadataBase: new URL(사이트주소),
  title: {
    default: 사이트이름,
    template: `%s · ${사이트이름}`,
  },
  description: "하루에 한 줄씩 남기는 작은 가게. 오늘 무슨 일이 있었는지 한 줄로 적어두세요.",
  openGraph: {
    // 카톡·슬랙에 링크를 붙였을 때 보이는 카드
    title: 사이트이름,
    description: "하루에 한 줄씩 남기는 작은 가게",
    url: 사이트주소,
    siteName: 사이트이름,
    locale: "ko_KR",
    type: "website",
    // images: ["/og.png"],   ← 1200×630 이미지를 public/ 에 넣고 주석을 푸세요
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="header">
          <Link href="/" className="brand">
            {사이트이름}
          </Link>
          <nav>
            <Link href="/about" className="navlink">
              소개
            </Link>
            <Link href="/login" className="navlink">
              입구
            </Link>
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          AI 업무자동화 &amp; 바이브코딩 · 4~6주차 실습 예제
        </footer>

        {/* ⑥회차 · 계수기 — 이 한 줄이 방문 수를 세기 시작합니다 */}
        <Analytics />
      </body>
    </html>
  );
}
