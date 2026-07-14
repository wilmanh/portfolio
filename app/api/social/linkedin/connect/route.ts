import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getLinkedInAuthorizationUrl } from "@/lib/social/linkedin-oauth";
export const runtime = "nodejs";
export async function GET(request: Request) { if (!(await isAuthenticated())) return NextResponse.redirect(new URL("/blog/login", request.url)); try { const state = randomUUID(); const response = NextResponse.redirect(getLinkedInAuthorizationUrl(state)); response.cookies.set("linkedin_oauth_state", state, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 600 }); return response; } catch { return NextResponse.redirect(new URL("/blog/admin/social/linkedin?error=configuration", request.url)); } }
