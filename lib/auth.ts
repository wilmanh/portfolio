import "server-only";

import { auth } from "@/auth";

export async function isAuthenticated() {
  const session = await auth();
  const administratorEmail = (process.env.ADMIN_EMAIL ?? "wilman.h.h@gmail.com").toLowerCase();

  return session?.user?.email?.toLowerCase() === administratorEmail;
}
