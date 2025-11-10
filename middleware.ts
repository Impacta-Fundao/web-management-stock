import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/Produtos", "/Vendas"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtectedRoute && !token) {
    console.log("🚫 REDIRECIONANDO para /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Seller",
    "/Seller/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
