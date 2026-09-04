"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import OneLineForm from "@/components/OneLineForm";
import OneLineList from "@/components/OneLineList";
import { track } from "@vercel/analytics";
import { supabase } from "@/lib/supabase";
import { toOneLine, type LineRow, type OneLine } from "@/lib/store";

export default function HomePage() {
  const [lines, setLines] = useState<OneLine[]>([]);
  const [이메일, set이메일] = useState<string | null>(null);
  const [불러오는중, set불러오는중] = useState(true);
  const [알림, set알림] = useState("");

  // 지금 팔찌를 찬 사람이 누구인지 물어봅니다.
  async function 팔찌가져오기() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  // 웨이터에게 "보여주세요" (GET) — 창고에 직접 들어가지 않습니다.
  const 불러오기 = useCallback(async () => {
    set불러오는중(true);
    const 팔찌 = await 팔찌가져오기();

    if (!팔찌) {
      set이메일(null);
      setLines([]);
      set불러오는중(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    set이메일(user?.email ?? null);

    const res = await fetch("/api/lines", {
      headers: { Authorization: `Bearer ${팔찌}` },
    });

    if (!res.ok) {
      // 상태코드로 무슨 일인지 알 수 있습니다. 4는 손님 잘못, 5는 가게 잘못.
      set알림(`불러오지 못했습니다 (${res.status})`);
      set불러오는중(false);
      return;
    }

    const json = await res.json();
    setLines((json.lines as LineRow[]).map(toOneLine));
    set불러오는중(false);
  }, []);

  useEffect(() => {
    불러오기();
    // 로그인·로그아웃이 일어나면 화면을 다시 그립니다.
    const { data: sub } = supabase.auth.onAuthStateChange(() => 불러오기());
    return () => sub.subscription.unsubscribe();
  }, [불러오기]);

  // 웨이터에게 "새로 적어주세요" (POST)
  async function 남기기(nickname: string, message: string) {
    const 팔찌 = await 팔찌가져오기();
    if (!팔찌) return;

    const res = await fetch("/api/lines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${팔찌}`,
      },
      body: JSON.stringify({ nickname, message }),
    });

    if (!res.ok) {
      set알림(`남기지 못했습니다 (${res.status})`);
      return;
    }

    const json = await res.json();
    setLines((prev) => [toOneLine(json.line as LineRow), ...prev]);
    set알림("");

    // ⑥회차 · 중요한 문에 계수기를 답니다.
    // "이게 일어나면 성공"이라고 말할 수 있는 행동만 셉니다.
    track("post_created");
  }

  // 웨이터에게 "지워주세요" (DELETE)
  async function 지우기(id: string) {
    const 팔찌 = await 팔찌가져오기();
    if (!팔찌) return;

    const res = await fetch(`/api/lines?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${팔찌}` },
    });

    if (res.ok) setLines((prev) => prev.filter((l) => l.id !== id));
  }

  async function 로그아웃() {
    await supabase.auth.signOut();
  }

  return (
    <>
      <section className="hero">
        <h1 className="title">오늘의 한 줄</h1>
        <p className="lead">
          이제 새로고침해도 사라지지 않습니다. 창고에 들어가 있으니까요.
        </p>
      </section>

      {이메일 ? (
        <>
          <div className="authbar">
            <span className="who">{이메일} 님</span>
            <button className="button ghost small" onClick={로그아웃}>
              로그아웃
            </button>
          </div>
          <OneLineForm onSubmit={남기기} />
          {알림 && <p className="hint">{알림}</p>}
          {불러오는중 ? (
            <p className="empty">창고에서 꺼내는 중…</p>
          ) : (
            <OneLineList lines={lines} onDelete={지우기} />
          )}
          <p className="hint">
            여기 보이는 것은 <strong>내가 쓴 줄뿐</strong>입니다. 다른 계정으로
            로그인하면 전혀 다른 목록이 보입니다 — 창고가 알아서 걸러줍니다.
          </p>
        </>
      ) : (
        <section className="hero">
          <p className="empty">
            한 줄을 남기려면 <Link href="/login" className="navlink">로그인</Link>이
            필요합니다.
          </p>
        </section>
      )}
    </>
  );
}
