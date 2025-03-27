import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "pt", "es"],
  defaultLocale: "pt",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
