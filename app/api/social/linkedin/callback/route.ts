import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createLinkedInConnection } from "@/lib/social/linkedin-oauth";
import { getSocialRepository } from "@/lib/social/repository";
export const runtime = "nodejs";
export async function GET(request: Request) { const redirect = (result: string) => NextResponse.redirect(new URL(`/blog/admin/social/linkedin?${result}`, request.url)); if (!(await isAuthenticated())) return NextResponse.redirect(new URL("/blog/login", request.url)); const url = new URL(request.url); const state = url.searchParams.get("state"); const code = url.searchParams.get("code"); if (url.searchParams.has("error")) return redirect("error=denied"); if (!state || !code || request.headers.get("cookie")?.match(/linkedin_oauth_state=([^;]+)/)?.[1] !== state) return redirect("error=state"); try { const connection = await createLinkedInConnection(code); await getSocialRepository().saveConnection(connection); const response = redirect("connected=1"); response.cookies.delete("linkedin_oauth_state"); return response; } catch { return redirect("error=connection"); } }
