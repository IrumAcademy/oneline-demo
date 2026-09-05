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

## 이 브랜치 — `week5-broken`  ⚠ 일부러 깨뜨려 둔 브랜치입니다

**⑤회차 실습용**입니다. 배포하면 실패하도록 **사고 세 개**를 심어놨습니다.
정상 코드가 필요하시면 `week5-done` 을 받으세요.

### 오늘 할 일

1. 이 브랜치를 받아 Vercel에 연결하고 배포합니다 — **실패합니다**
2. 빌드 로그를 **위에서부터** 읽습니다. 첫 번째 빨간 줄이 진짜 원인입니다
3. 로그가 알려준 `파일:줄` 로 갑니다 — VS Code 에서 `Ctrl + P` → 파일명, `Ctrl + G` → 줄번호
4. 고치고 커밋 → push 하면 Vercel이 알아서 다시 배포합니다
5. 세 개를 다 잡을 때까지 2~4를 반복합니다

```powershell
git switch week5-broken     # Fork·clone 을 이미 해두셨다면 이 한 줄
npm install
```

### 힌트

- 사고 하나는 **내 컴퓨터에서는 멀쩡한데 배포하면 터집니다.**
  맥과 윈도우는 파일 이름의 대소문자를 구분하지 않지만, 서버(리눅스)는 구분합니다
- 사고 하나는 **코드가 아니라 설정**입니다. 창고 열쇠를 Vercel에도 알려주셔야 합니다
- 사고 하나는 **이름이 살짝 다릅니다.** 창고는 `snake_case`, 화면은 `camelCase` 를 씁니다

<details>
<summary><strong>강사용 — 정답 (수강생은 먼저 직접 찾아보세요)</strong></summary>

| # | 위치 | 심어둔 것 | 로그에 뜨는 말 |
|---|---|---|---|
| 1 | Vercel 설정 | 환경변수 미등록 | `창고 주소나 열쇠가 없습니다...` |
| 2 | `app/page.tsx` | `@/components/onelinelist` (소문자) | `Module not found: Can't resolve...` |
| 3 | `components/OneLineList.tsx` | `line.created_at` | `Property 'created_at' does not exist on type 'OneLine'. Did you mean 'createdAt'?` |

1번은 Vercel → Settings → Environment Variables 에 등록 후 **Redeploy**.
등록만 하고 재배포를 안 해서 "왜 안 되죠" 하는 경우가 매년 나옵니다.

</details>
