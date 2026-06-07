import createMiddleware from 'next-intl/middleware';
import {NextResponse, type NextRequest} from 'next/server';
import {routing} from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const legacyRedirects: Record<string, string> = {
  '/course/קצת-עלינו': '/he/about-us',
  '/course/טפסים': '/he/resources',
  '/course/תהליך-רישום': '/he/admissions',
  '/course/רשימת-ספרים-תשפו': '/he/resources',
  '/course/השכרת-פנימיה': '/he/facilities/rent',
  '/contact': '/he/contact',
  '/news': '/he/news',
  '/news/מנהיגות-חברתית': '/he/news/social-leadership-program',
  '/news/מנהיגות-חברתית-2': '/he/news/social-leadership-program',
  '/news/זכות-הורים': '/he/news/zechut-horim-community-volunteering',
  '/news/בית-מדרש-בוגרות': '/he/news/alumni-beit-midrash-tzama-nafshi',
  '/course/מגמות': '/he/academy',
  '/course/מגמות/מחשבת-ישראל': '/he/academy/humanities/jewish-thought',
  '/course/מגמות/תיאטרון': '/he/academy/arts/theatre',
  '/course/מגמות/כימיה-ברשת': '/he/academy/science/chemistry',
  '/course/מגמות/פיזיקה-ברשת': '/he/academy/science/physics',
  '/course/מגמות/ביולוגיה': '/he/academy/science/biology',
  '/course/מגמות/מדעי-החברה': '/he/academy/humanities/social-sciences',
  '/course/מגמות/ארץ': '/he/academy/humanities/land-of-israel',
  '/course/מגמות/מחול': '/he/academy/arts/dance',
};

function normalizeLegacyPath(pathname: string): string {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  const withoutTrailingSlash = decoded.length > 1 ? decoded.replace(/\/+$/, '') : decoded;
  return withoutTrailingSlash.replace(/^\/(he|en)(?=\/)/, '');
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLocalePrefix = /^\/(he|en)(?=\/|$)/.test(pathname);
  const legacyPath = normalizeLegacyPath(pathname);
  const destination = legacyRedirects[legacyPath];
  const isCurrentTopLevelRoute = hasLocalePrefix && (legacyPath === '/contact' || legacyPath === '/news');

  if (destination && !isCurrentTopLevelRoute) {
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }

  if (legacyPath.startsWith('/course/מגמות/')) {
    return NextResponse.redirect(new URL('/he/academy', request.url), 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
