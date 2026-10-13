import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);
export const config = {
  // Ignora arquivos internos do Next.js e estáticos
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
