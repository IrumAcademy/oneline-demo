# 오늘의 한 줄 — 4~6주차 공통 실습 예제

「잠긴 주방」 이야기의 **그 가게**입니다.
AI가 차려놓은 상태 그대로이고, 앞으로 6회차에 걸쳐 함께 고쳐 나갑니다.

## 시작하기

```bash
npm install          # 재료 받아오기
cp .env.example .env.local
npm run dev          # 주방 불 켜기 → http://localhost:3000
```

## 지금 이 가게의 상태

| 공간 | 상태 |
|---|---|
| 주방 | 있음 — 다만 여러분이 아직 들어가 본 적이 없습니다 |
| 창고 | **없음** — 한 줄을 남겨도 새로고침하면 사라집니다 |
| 홀 | **없음** — 서버도 API도 없이 브라우저 혼자 다 합니다 |
| 간판 | **없음** — localhost. 남에게 주소를 알려줄 수 없습니다 |
| 장부 | **없음** — 누가 왔다 갔는지 알 수 없습니다 |

## 폴더 구조

```
oneline-demo/
├── app/
│   ├── layout.tsx        모든 페이지를 감싸는 틀 (머리말·꼬리말)
│   ├── page.tsx          주소 "/"      ← 폴더 위치가 곧 주소
│   ├── about/page.tsx    주소 "/about"
│   └── globals.css       가게 전체 인테리어
├── components/
│   ├── OneLineForm.tsx   한 줄 입력칸
│   └── OneLineList.tsx   남겨진 한 줄 목록
├── lib/
│   └── store.ts          ★ 임시 창고 — ③회차에서 교체합니다
├── .env.example          금고에 무엇이 들어가야 하는지 목록
├── .gitignore            사진에 안 찍을 물건 목록
└── package.json          발주 명세서
```

## 회차별 브랜치

진도를 놓쳤다면 해당 브랜치를 받아 다음 회차에 합류하세요.

```bash
git fetch origin
git checkout week4-done     # ①②회차 완료 상태
git checkout week5-done     # ③④회차 완료 상태
git checkout week6-done     # ⑤⑥회차 완료 상태
```

## ①회차에서 할 일

1. 터미널로만 이 폴더에 들어와 `npm run dev` 실행
2. `app/`, `components/`, `lib/`, `.env.example`, `package.json`을 열어 구조 지도 그리기
3. 본인 서비스 저장소를 만들고 커밋 5개 쌓기
4. 브랜치를 파서 일부러 망가뜨렸다가 되돌아오기

자세한 절차는 `1회차_실습가이드.md`를 참고하세요.

---

## 이 브랜치 — `week6-done`

**⑤⑥회차(6주차)를 마친, 과정 최종 상태**입니다. ①~④회차 결과물이 전부 들어 있습니다.

### 무엇이 더해졌나

| 파일 | 회차 | 내용 |
|---|---|---|
| `app/layout.tsx` | ⑤⑥ | OG 메타태그(카톡 미리보기) + `<Analytics />` 한 줄 |
| `app/sitemap.ts` | ⑤ | `/sitemap.xml` — 검색엔진에게 주는 지도 |
| `app/robots.ts` | ⑤ | `/robots.txt` — 어디를 봐도 되는지 안내 |
| `app/page.tsx` | ⑥ | `track("post_created")` |
| `app/login/page.tsx` | ⑥ | `track("signup_clicked")` |

### 저장소에 들어오지 않는 것

⑤회차 작업의 절반은 코드가 아니라 **설정**입니다. 이 브랜치를 받아도 따라오지 않습니다.

- Vercel 프로젝트 연결과 환경변수 등록 (`.env.local` 의 값을 Vercel에도 넣어야 합니다)
- 도메인 구매와 DNS 연결
- Google Search Console · 네이버 서치어드바이저 등록

### 합류하는 법

`week5-done` 과 동일합니다(창고 만들기 → `schema.sql` 실행 → `.env.local` 채우기).
거기에 두 가지만 더 하시면 됩니다.

```powershell
git fetch origin
git checkout week6-done
npm install
```

**1. `.env.local` 에 주소 한 줄 추가**

```
NEXT_PUBLIC_SITE_URL=https://내도메인.com
```

없으면 `http://localhost:3000` 으로 동작합니다. 배포 후에 진짜 주소로 바꾸세요.

**2. Vercel 에서 Analytics 켜기** — 프로젝트 → Analytics 탭 → Enable

### 확인해볼 것

- `/sitemap.xml`, `/robots.txt` 로 직접 접속해보세요. 파일을 만든 적 없는데 주소가 생깁니다.
- 카톡에 내 주소를 붙여넣어 미리보기 카드가 뜨는지 보세요.
- 글을 하나 남기고 Vercel Analytics 실시간 화면에서 `post_created` 가 잡히는지 확인하세요.
  반영에 몇 분 걸릴 수 있습니다.
