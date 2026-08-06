/**
 * next-intl server-side configuration.
 * Locale is resolved from a cookie that the client writes on every currency change.
 */
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, locales, type AppLocale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const saved = cookieStore.get("preferred-locale")?.value as AppLocale | undefined;
  const locale: AppLocale = saved && locales.includes(saved) ? saved : defaultLocale;

  // Dynamic import so each locale is a separate chunk
  const messages = (await import(`../../messages/${locale}.json`)).default as Record<
    string,
    Record<string, string>
  >;

  return { locale, messages };
});
