
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/posts/:id", // Specific posts
    "/api/webhook/clerk", // Clerk webhook
    "/api/uploadthing", // Upload endpoint
  ],
  ignoredRoutes: [
    "/api/webhook/clerk", // Clerk webhook
    "/api/uploadthing", // Upload endpoint
  ],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // All pages excluding static files and _next
    "/", // Homepage
    "/(api|trpc)(.*)", // All API and TRPC routes
  ],
};
