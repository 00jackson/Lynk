import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*|favicon.ico).*)"], // Protect all routes except static files
};