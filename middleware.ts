import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET; // Same secret used in NextAuth.js
  const token = await getToken({
    req,
    secret,
    cookieName: "next-auth.session-token",
    // cookieName: "next-auth.session-token",
  });

  // token from the cookies named "token"

  console.log(req.cookies.get("token"));

  const url = new URL(req.url);
  const pathname = url.pathname;
  if (!token) {
    console.log("redirecting to login");
    return NextResponse.redirect(new URL("/login?next=" + pathname, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/(.*)"],
};
