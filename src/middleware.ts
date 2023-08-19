import { withAuth } from "next-auth/middleware";

// Define public paths
const publicPaths = ["sign-in", "sign-up"];

// Create a regex pattern to match all paths that are public
const excludePublicPathsPattern = publicPaths.join("|");

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sign-up (sign-up page)
     */
    `/((?!api|_next/static|_next/image|favicon.ico|sign-up).*)`,
  ],
};
export default withAuth({
  pages: {
    signIn: "/sign-in",
  },
});

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };
