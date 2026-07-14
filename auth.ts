import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const administratorEmail = () => (process.env.ADMIN_EMAIL ?? "wilman.h.h@gmail.com").toLowerCase();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/blog/login",
    error: "/blog/login",
  },
  callbacks: {
    signIn({ user, account }) {
      return account?.provider === "google" && user.email?.toLowerCase() === administratorEmail();
    },
  },
});
