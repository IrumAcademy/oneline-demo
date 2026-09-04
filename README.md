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
git fetch origin
git checkout week5-broken
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
