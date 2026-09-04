"use client";

// ─────────────────────────────────────────────────────────────
//  입구 — 팔찌를 채우는 곳 (④회차)
//
//  비밀번호를 우리가 직접 저장하지 않습니다.
//  암호화 · 재설정 메일 · 세션 관리까지 전부 Supabase 가 합니다.
//  우리는 세 줄을 부르기만 합니다.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [알림, set알림] = useState("");
  const [기다리는중, set기다리는중] = useState(false);

  async function 로그인(e: React.FormEvent) {
    e.preventDefault();
    set기다리는중(true);
    set알림("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    set기다리는중(false);
    if (error) {
      set알림(error.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function 회원가입() {
    set기다리는중(true);
    set알림("");

    const { error } = await supabase.auth.signUp({ email, password });

    set기다리는중(false);
    if (error) {
      set알림(error.message);
      return;
    }
    // Supabase 설정에 따라 확인 메일이 갑니다. 스팸함도 확인하세요.
    set알림("가입 완료. 확인 메일이 갔다면 인증 후 로그인해주세요.");
  }

  return (
    <section className="hero">
      <h1 className="title">입구</h1>
      <p className="lead">한 줄을 남기려면 먼저 팔찌를 받으셔야 합니다.</p>

      <form className="form form-col" onSubmit={로그인}>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (6자 이상)"
          minLength={6}
          required
        />
        <div className="row">
          <button className="button" type="submit" disabled={기다리는중}>
            로그인
          </button>
          <button
            className="button ghost"
            type="button"
            onClick={회원가입}
            disabled={기다리는중}
          >
            회원가입
          </button>
        </div>
      </form>

      {알림 && <p className="hint">{알림}</p>}

      <p className="hint">
        비밀번호는 우리 창고에 저장되지 않습니다. Supabase 가 대신 보관합니다.
      </p>
    </section>
  );
}
