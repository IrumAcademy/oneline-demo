import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// ⑤회차(9/19)에서 이 부분을 SEO 태그로 채웁니다
export const metadata: Metadata = {
  title: "오늘의 한 줄",
  description: "하루에 한 줄씩 남기는 작은 가게",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "오늘의 한 줄";

  return (
    <html lang="ko">
      <body>
        <header className="header">
          <Link href="/" className="brand">
            {siteName}
          </Link>
          <nav>
            <Link href="/about" className="navlink">
              소개
            </Link>
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">
          AI 업무자동화 &amp; 바이브코딩 · 4~6주차 실습 예제
        </footer>
      </body>
    </html>
  );
}
