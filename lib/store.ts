// ─────────────────────────────────────────────────────────────
//  창고 (임시)
//
//  지금 이 가게에는 창고가 없습니다.
//  손님이 남긴 한 줄은 조리대 위(= 브라우저 메모리)에만 올려둡니다.
//  → 새로고침하면 전부 사라집니다.
//
//  ③회차(9/13)에서 이 파일을 진짜 창고(Supabase)로 교체합니다.
// ─────────────────────────────────────────────────────────────

export type OneLine = {
  id: string;
  nickname: string;
  message: string;
  createdAt: string;
};

// 가게를 처음 열었을 때 놓여 있는 샘플 한 줄
export const seedLines: OneLine[] = [
  {
    id: "seed-1",
    nickname: "가게 주인",
    message: "오늘부터 이 가게는 제 겁니다.",
    createdAt: "2026-09-05T13:00:00+09:00",
  },
];

export function createLine(nickname: string, message: string): OneLine {
  return {
    id: crypto.randomUUID(),
    nickname: nickname.trim() || "익명",
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm}`;
}
