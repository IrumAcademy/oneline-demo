// ─────────────────────────────────────────────────────────────
//  웨이터 (④회차)
//
//  ③회차까지는 손님(브라우저)이 창고에 직접 들어갔습니다.
//  이제 손님은 이 웨이터에게 주문서만 건네고, 창고는 웨이터가 다녀옵니다.
//
//  주소도 폴더 위치 그대로입니다.
//      app/api/lines/route.ts   →   /api/lines
//
//  이 파일은 서버에서만 실행됩니다. 브라우저 개발자도구로 열어봐도 안 보입니다.
// ─────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { LineRow } from "@/lib/store";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 손님이 내민 팔찌(토큰)를 그대로 들고 창고에 갑니다.
// 이렇게 해야 창고의 RLS 가 "이 사람 것"만 골라 내줍니다.
function 창고열기(팔찌: string) {
  return createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${팔찌}` } },
    auth: { persistSession: false },
  });
}

function 팔찌확인(req: Request): string | null {
  const h = req.headers.get("authorization");
  if (!h?.startsWith("Bearer ")) return null;
  return h.slice(7);
}

// ── GET · 보여주세요 ──────────────────────────────────────────
export async function GET(req: Request) {
  const 팔찌 = 팔찌확인(req);
  if (!팔찌) {
    // 401 — 회원만 이용 가능합니다 (로그인을 안 했거나 시간이 지났습니다)
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const supabase = 창고열기(팔찌);
  const { data, error } = await supabase
    .from("lines")
    .select("id, nickname, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    // 500 — 주방에 불났습니다 (로그를 봐야 합니다)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lines: (data ?? []) as LineRow[] });
}

// ── POST · 새로 적어주세요 ────────────────────────────────────
export async function POST(req: Request) {
  const 팔찌 = 팔찌확인(req);
  if (!팔찌) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { nickname, message } = await req.json();

  // 판단 — 빈 칸이면 그냥 돌려보냅니다 (②회차의 그 뼈대)
  if (!message || message.trim().length === 0) {
    // 400 — 주문서가 비었습니다
    return NextResponse.json({ error: "한 줄을 입력해주세요." }, { status: 400 });
  }

  const supabase = 창고열기(팔찌);

  // 누가 쓴 글인지는 손님이 아니라 웨이터가 채웁니다.
  // 손님이 user_id 를 직접 보내게 두면 남의 이름으로 쓸 수 있습니다.
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "팔찌가 만료됐습니다." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("lines")
    .insert({
      user_id: user.id,
      nickname: (nickname ?? "").trim() || "익명",
      message: message.trim(),
    })
    .select("id, nickname, message, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 201 — 새로 만들어졌습니다
  return NextResponse.json({ line: data as LineRow }, { status: 201 });
}

// ── DELETE · 지워주세요 ───────────────────────────────────────
export async function DELETE(req: Request) {
  const 팔찌 = 팔찌확인(req);
  if (!팔찌) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "어느 줄을 지울지 알려주세요." }, { status: 400 });
  }

  const supabase = 창고열기(팔찌);

  // where 를 반드시 붙입니다. 빼면 장부 전체가 날아갑니다. (③회차 경고)
  // 남의 줄을 지우려 해도 RLS 가 막아서 0건 삭제로 끝납니다.
  const { error } = await supabase.from("lines").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
