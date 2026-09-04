"use client";

import { useState } from "react";
import OneLineForm from "@/components/OneLineForm";
import OneLineList from "@/components/OneLineList";
import { createLine, seedLines, type OneLine } from "@/lib/store";

export default function HomePage() {
  // 값(변수) — 지금은 브라우저 메모리에만 있습니다.
  // 새로고침하면 사라집니다. ③회차에서 창고를 만들며 해결합니다.
  const [lines, setLines] = useState<OneLine[]>(seedLines);

  function handleSubmit(nickname: string, message: string) {
    setLines((prev) => [createLine(nickname, message), ...prev]);
  }

  return (
    <>
      <section className="hero">
        <h1 className="title">오늘의 한 줄</h1>
        <p className="lead">
          지나가다 들르셨다면, 오늘 한 줄만 남기고 가세요.
        </p>
      </section>

      <OneLineForm onSubmit={handleSubmit} />
      <OneLineList lines={lines} />

      <p className="hint">
        새로고침해 보세요. 방금 남긴 줄이 어떻게 되는지 확인해 봅시다.
      </p>
    </>
  );
}
