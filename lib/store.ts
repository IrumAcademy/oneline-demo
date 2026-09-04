// ─────────────────────────────────────────────────────────────
//  창고 (③회차에서 교체 완료)
//
//  ①②회차까지는 이 파일이 브라우저 메모리였습니다.
//  새로고침하면 전부 사라지던 그 자리입니다.
//
//  지금은 진짜 창고(Supabase)로 바뀌었고, 이 파일에는
//  '무엇을 담는가'(타입)와 화면에 쓰는 작은 도구만 남았습니다.
// ─────────────────────────────────────────────────────────────

export type OneLine = {
  id: string;
  nickname: string;
  message: string;
  createdAt: string;
};

// 창고에서 꺼낸 행(row) 을 화면이 쓰는 모양으로 바꿔줍니다.
// 창고는 snake_case(created_at), 화면은 camelCase(createdAt) 를 씁니다.
export type LineRow = {
  id: string;
  nickname: string;
  message: string;
  created_at: string;
};

export function toOneLine(row: LineRow): OneLine {
  return {
    id: row.id,
    nickname: row.nickname,
    message: row.message,
    createdAt: row.created_at,
  };
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm}`;
}
