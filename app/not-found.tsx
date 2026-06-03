import Link from 'next/link';
import {Secular_One, Bebas_Neue, Instrument_Sans, Inter} from 'next/font/google';
import {cn} from '@/lib/utils';
import './globals.css';

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});
const secularOne = Secular_One({subsets: ['latin', 'hebrew'], weight: '400', variable: '--font-display'});
const bebasNeue = Bebas_Neue({subsets: ['latin'], weight: '400', variable: '--font-bebas'});
const instrumentSans = Instrument_Sans({subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inst'});

// Global fallback for paths with no locale segment. The middleware normally
// redirects locale-less paths to the default locale, so this is rarely hit —
// it renders self-contained (no shared layout) with the default-locale (he) copy.
export default function GlobalNotFound() {
  return (
    <html
      lang="he"
      dir="rtl"
      className={cn('font-sans', inter.variable, secularOne.variable, bebasNeue.variable, instrumentSans.variable)}
    >
      <body className="antialiased" style={{background: '#fafaf6', color: '#000b21'}}>
        <section className="tz-404">
          <div className="tz-404-inner tz-page">
            <p className="tz-404-eyebrow">{'// '}שגיאה · 404</p>
            <div className="tz-404-code" aria-hidden="true">
              <span>404</span>
              <span className="tz-404-square" />
            </div>
            <h1 className="tz-404-title">
              <span className="tz-404-title-cream">העמוד שאתם מחפשים</span>{' '}
              <span className="tz-404-title-gold">לא נמצא כאן.</span>
            </h1>
            <p className="tz-404-desc">
              ייתכן שהקישור אינו מעודכן, או שהעמוד עבר למקום אחר. כך או כך, נשמח לעזור לכם למצוא את הדרך חזרה.
            </p>
            <div className="tz-404-btns">
              <Link href="/" className="tz-404-btn-primary">חזרה לדף הבית</Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
