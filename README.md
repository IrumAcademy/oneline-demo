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
│   ├── page.tsx          주소 "/"        창고 대신 웨이터를 부릅니다     ④
│   ├── globals.css       가게 전체 인테리어
│   ├── about/
│   │   └── page.tsx      주소 "/about"
│   ├── hello/
│   │   └── page.tsx      주소 "/hello"   ①회차 실습 2의 흔적
│   ├── login/
│   │   └── page.tsx      주소 "/login"   입구 — 회원가입 · 로그인        ④
│   ├── sitemap.ts        주소 "/sitemap.xml"  검색엔진에게 주는 지도    ⑤
│   ├── robots.ts         주소 "/robots.txt"   로봇 출입 안내            ⑤
│   └── api/
│       └── lines/
│           └── route.ts  주소 "/api/lines"  웨이터 — GET·POST·DELETE    ④
├── components/
│   ├── OneLineForm.tsx   한 줄 입력칸
│   └── OneLineList.tsx   남겨진 한 줄 목록
├── lib/
│   ├── store.ts          타입과 변환기 — 창고 로직은 여기서 빠졌습니다   ③
│   └── supabase.ts       창고 열쇠고리 (브라우저용)                      ③
├── supabase/
│   └── schema.sql        ★ 창고 설계도 — 표 · 색인 · RLS · 정책 3개     ③④
├── .env.example          금고에 무엇이 들어가야 하는지 적은 목록
├── .gitignore            사진에 안 찍을 물건 목록
├── next.config.mjs       Next.js 설정 — 오늘은 열어만 봅니다
├── package.json          발주 명세서 — 어떤 부품을 쓰는지
├── package-lock.json     납품 영수증 — 버전까지 못박아 둔 것 (자동 생성)
├── tsconfig.json         타입 검사 규칙 — 오늘은 열어만 봅니다
└── README.md             이 파일
```

`npm install` 을 하고 나면 두 개가 더 보입니다.
둘 다 `.gitignore` 에 걸려 있어 **저장소에는 올라가지 않습니다.**

```
node_modules/          납품받은 재료 — 용량이 크고, 지워도 다시 받으면 됩니다
.next/                 조리 중간 결과물 — 자동으로 생겼다 사라집니다
```

그리고 직접 만들어야 하는 것이 하나 있습니다.

```
.env.local             ★ 금고 — 절대 저장소에 올리지 않습니다
                         cp .env.example .env.local 로 만듭니다
```

## 회차별 브랜치 — 받는 법

진도를 놓쳤다면 해당 브랜치를 받아 다음 회차에 합류하세요.
**이 저장소는 강사 계정 것이라 여러분이 올릴 수 없습니다.**
먼저 내 계정으로 복사(Fork)한 다음, 그 복사본을 내려받습니다.

### ① Fork — 웹에서 버튼 한 번

이 페이지 오른쪽 위 **`Fork`** → **`Create fork`**

> ⚠️ **「Copy the `main` branch only」 체크박스가 보이면 반드시 푸세요.**
> 안 그러면 `week*-done` 브랜치가 따라오지 않아 안전망이 통째로 사라집니다.

주소창이 `github.com/`**`내-아이디`**`/oneline-demo` 로 바뀌면 성공입니다.

### ② clone — 터미널에서 한 줄

초록색 **`Code`** 버튼에서 주소를 복사하세요.
**원본이 아니라 내 계정 주소**여야 합니다.

```bash
git clone https://github.com/내-아이디/oneline-demo.git
cd oneline-demo
npm install
```

### ③ 원하는 시점으로 이동

```bash
git switch week4-done     # ①②회차 완료 상태
git switch week5-done     # ③④회차 완료 상태
git switch week6-done     # ⑤⑥회차 완료 상태
git switch main           # 처음 상태로
```

Fork 한 저장소는 **여러분 것**이라 그대로 `git push` 가 됩니다.

> **`week*-done` 이 안 보인다면** Fork 할 때 체크박스를 못 푼 것입니다.
> 다시 Fork 하거나, 원본에서 끌어오세요.
> ```bash
> git remote add upstream https://github.com/IrumAcademy/oneline-demo.git
> git fetch upstream
> git switch -c week4-done upstream/week4-done
> ```

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
git switch week6-done     # Fork·clone 을 이미 해두셨다면 이 한 줄
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
