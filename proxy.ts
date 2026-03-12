import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token");

  const isSignIn = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUp = request.nextUrl.pathname.startsWith("/sign-up");

  if ((isSignIn || isSignUp) && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}