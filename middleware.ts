import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ROLES = {
  PERSONAL_TRAINER: "PERSONAL_TRAINER",
  STUDENT: "STUDENT",
} as const;

const PUBLIC_ROUTES = ["/", "/sign-in(.*)", "/sign-up(.*)", "/api(.*)"];

const isPublicRoute = createRouteMatcher(PUBLIC_ROUTES);

const getRoleRedirect = (role: string | undefined) => {
  switch (role) {
    case ROLES.PERSONAL_TRAINER:
      return "/personal";
    case ROLES.STUDENT:
      return "/student";
    default:
      return null;
  }
};

export default clerkMiddleware(async (auth, req) => {
  // Handle public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect non-public routes
  try {
    auth.protect();
  } catch (error) {
    // Handle unauthorized access (optional)
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Get user info
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Skip API routes
  const currentPath = new URL(req.url).pathname;
  if (currentPath.startsWith("/api")) {
    return NextResponse.next();
  }

  try {
    // Get user with caching consideration
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const userRole = user?.publicMetadata?.role as string | undefined;

    // Determine redirect path based on role
    const roleRedirect = getRoleRedirect(userRole);

    if (roleRedirect && !currentPath.startsWith(roleRedirect)) {
      return NextResponse.redirect(new URL(roleRedirect, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Option 1: Redirect to error page
    // return NextResponse.redirect(new URL("/error", req.url));

    // Option 2: Allow access but log the error
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
