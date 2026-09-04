import { formatTime, type OneLine } from "@/lib/store";

type Props = {
  lines: OneLine[];
  onDelete?: (id: string) => void;
};

export default function OneLineList({ lines, onDelete }: Props) {
  if (lines.length === 0) {
    return <p className="empty">아직 남겨진 한 줄이 없습니다.</p>;
  }

  return (
    <ul className="list">
      {/* 반복 — ②회차에서 파이썬 for 문과 나란히 놓고 본 부분입니다 */}
      {lines.map((line) => (
        <li key={line.id} className="card">
          <div className="card-head">
            <span className="nick">{line.nickname}</span>
            <span className="time">
              {formatTime(line.createdAt)}
              {onDelete && (
                <button
                  className="del"
                  onClick={() => onDelete(line.id)}
                  aria-label="이 줄 지우기"
                >
                  지우기
                </button>
              )}
            </span>
          </div>
          <p className="msg">{line.message}</p>
        </li>
      ))}
    </ul>
  );
}
