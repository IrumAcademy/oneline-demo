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

## 이 브랜치 — `week4-done`

**①②회차(4주차)를 마친 상태**입니다.

①회차 실습 2에서 만든 `app/hello/page.tsx` 가 들어 있습니다.
폴더 하나를 만들었더니 `/hello` 주소가 생긴다는 것을 확인하는 파일입니다.

### 못 따라오셨다면

```powershell
git fetch origin
git checkout week4-done
npm install
npm run dev
```

여기서부터 ③회차(창고 만들기)에 그대로 합류하시면 됩니다.

### 다만, 이것만은 브랜치가 대신해주지 못합니다

①②회차에서 얻는 것은 코드가 아니라 **습관**입니다.

- VS Code 한 창에서 편집 · 터미널 · Git 을 다루기
- `Ctrl` + `` ` `` 로 터미널을 열고 `npm run dev` 로 실행하기
- 커밋하기 전에 소스 제어에서 **바뀐 줄(diff)** 을 확인하기
- 망가뜨려도 `git switch main` 으로 돌아오기

이 네 가지는 브랜치를 받아도 따라오지 않습니다.
막히는 부분은 ①회차 실습 가이드를 다시 보시거나, 편하게 질문해주세요.
혼자 밤새우지 마세요.
