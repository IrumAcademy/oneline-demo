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

## 이 브랜치 — `week5-done`

**③④회차(5주차)를 마친 상태**입니다. ①②회차 결과물도 그대로 들어 있습니다.

`lib/store.ts` 가 더 이상 브라우저 메모리가 아닙니다. 새로고침해도 사라지지 않고,
손님(브라우저)은 창고에 직접 들어가지 않습니다. 웨이터(`/api/lines`)를 거칩니다.

### 무엇이 바뀌었나

| 파일 | 회차 | 내용 |
|---|---|---|
| `supabase/schema.sql` | ③④ | 표 만들기 + RLS 정책 전문 |
| `lib/supabase.ts` | ③ | 창고 연결 |
| `lib/store.ts` | ③ | 메모리 저장 로직이 사라지고 타입만 남음 |
| `app/api/lines/route.ts` | ④ | 웨이터 — GET · POST · DELETE |
| `app/login/page.tsx` | ④ | 입구 — 회원가입 · 로그인 |
| `app/page.tsx` | ④ | 창고 직접 접근 → API 호출로 교체 |

### 합류하는 법 — 코드만 받아서는 안 돌아갑니다

이 브랜치를 받아도 **창고는 각자 만들어야 합니다.** 순서대로 하세요.

**1. 코드 받기**

```powershell
git fetch origin
git checkout week5-done
npm install
```

**2. 내 창고 만들기** — supabase.com 에서 프로젝트 생성 (지역: 서울)

**3. 창고에 표 만들기** — Supabase → SQL Editor 에 `supabase/schema.sql` 을 통째로 붙여넣고 실행

**4. 열쇠 적어두기**

```powershell
cp .env.example .env.local
```

Supabase → Project Settings → Data API 에서 URL 과 anon key 를 복사해
`.env.local` 에 채웁니다. **`.env.local` 은 절대 커밋하지 마세요.**

**5. 실행**

```powershell
npm run dev
```

`/login` 에서 회원가입 → 로그인 → 한 줄 남기기. 새로고침해도 남아 있으면 성공입니다.

### 직접 확인해볼 것

- 계정을 **두 개** 만들어 각각 로그인해보세요. 서로의 글이 **안 보입니다.**
  화면이 아니라 창고가 걸러주는 겁니다 — 그게 RLS 입니다.
- `supabase/schema.sql` 에서 `enable row level security` 만 빼고 다시 실행하면
  남의 글이 그대로 보입니다. 한 번 켜보고 꺼보세요. ④회차의 핵심입니다.
- F12 → Network 탭에서 `/api/lines` 요청을 눌러보세요.
  무엇을 보냈고 무엇을 받았는지, 상태코드가 200 인지 401 인지 전부 보입니다.

### 자주 막히는 곳

| 증상 | 원인 |
|---|---|
| 빌드가 `창고 주소나 열쇠가 없습니다` 로 실패 | `.env.local` 을 안 만들었습니다 (4번) |
| 로그인은 되는데 목록이 비어 있음 | 정상입니다. 그 계정으로 쓴 글이 아직 없습니다 |
| 글을 남겼는데 목록에 안 뜸 | RLS 정책이 안 걸렸습니다. `schema.sql` 의 policy 부분을 다시 실행 |
| 401 이 계속 뜸 | 회원가입 확인 메일 인증이 안 끝났습니다. 스팸함도 보세요 |
