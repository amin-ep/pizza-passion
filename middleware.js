import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const protectedRoutes = ["/account", "/cart"];
const authProtectedRoutes = ["/access/login", "/access", "/forget", "/verify"];
export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => {
    return path.startsWith(route);
  });

  const isAuthenticatedProtectedRoute = authProtectedRoutes.some((route) => {
    return path.startsWith(route);
  });

  const cookieStore = await cookies();
  const authToken = await cookieStore.get(process.env.JWT_SECRET)?.value;

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/access/login", request.nextUrl));
  } else if (authToken && isAuthenticatedProtectedRoute) {
    return NextResponse.redirect(new URL("/menu", request.nextUrl));
  }

  return NextResponse.next();
}
