import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const protectedRoutes = ["/account", "/cart"];
export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => {
    return path.startsWith(route);
  });

  const cookieStore = await cookies();
  const authToken = await cookieStore.get(process.env.JWT_SECRET)?.value;

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/access/login", request.nextUrl));
  }

  return NextResponse.next();
}
