"use client";

import { useState } from "react";

type Props = {
  onSubmit: (nickname: string, message: string) => void;
};

export default function OneLineForm({ onSubmit }: Props) {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 판단(조건) — ②회차에서 다시 보게 될 뼈대입니다
    if (message.trim().length === 0) return;

    onSubmit(nickname, message);
    setMessage("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임"
        maxLength={12}
      />
      <input
        className="input message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="오늘의 한 줄을 남겨주세요"
        maxLength={80}
      />
      <button className="button" type="submit">
        남기기
      </button>
    </form>
  );
}
