import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const secret = process.env.AUTH_SECRET; // Same secret used in NextAuth.js
  // const token = await getToken({
  //   req,
  //   secret,
  //   // cookieName: "next-auth.session-token",
  // });

  // console.log("token", token);

  // get token from cookie
  const cookies = req.cookies;

  cookies.set("tokenww", "tokenww");

  // console.log("cookies", cookies);

  const token = cookies.get("token");

  const url = new URL(req.url);
  const pathname = url.pathname;
  // console.log("token", token);
  // console.log("pathname", pathname);
  // console.log("req.url", req.url);

  if (!token) {
    console.log("redirecting to login");
    return NextResponse.redirect(new URL("/login?next=" + pathname, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/(.*)"],
};
