import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ["/api/webhook/clerk", "/api/uploadthing", "/","/posts/:id"],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ["/api/webhook/clerk", "/api/uploadthing", "/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export default authMiddleware({
//     publicRoutes: [
//     '/',
//     '/posts/:id',
//     '/api/webhook/clerk',
//     '/api/uploadthing',

// ],
// ignoredRoutes:[
//     '/api/webhook/clerk',
//     '/api/uploadthing',
// ]

// });
 
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
