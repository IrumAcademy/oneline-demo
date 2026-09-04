// 이 파일의 위치가 곧 주소입니다.
//   app/about/page.tsx  →  /about
// ①회차 '프로젝트 구조 해부' 블록에서 직접 확인합니다.

export default function AboutPage() {
  return (
    <section className="hero">
      <h1 className="title">소개</h1>
      <p className="lead">
        4~6주차 동안 이 가게를 함께 고쳐 나갑니다.
      </p>
      <ul className="steps">
        <li>① 주방 — 터미널 · 프로젝트 구조 · Git</li>
        <li>② 레시피 — 코드를 읽는 눈</li>
        <li>③ 창고 — 데이터베이스</li>
        <li>④ 홀 — 서버 · API · 인증</li>
        <li>⑤ 간판 — 배포 · 도메인 · SEO</li>
        <li>⑥ 장부 — 퍼널 분석 · 개선</li>
      </ul>
    </section>
  );
}
