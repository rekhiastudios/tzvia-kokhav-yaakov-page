'use client';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import {useState} from 'react';
import {Link} from '@/i18n/navigation';
import {getActivities} from '@/lib/activities';

interface Activity {
  name: string;
  cat: string;
  catIdx: number;
  catSlug: string;
  slug: string;
  img: string;
  size: string;
  desc: string;
}

interface Cat {
  idx: number;
  label: string;
}

export function AcademySection() {
  const t = useTranslations('academy');
  const locale = useLocale();
  // Curated showcase tiles (≤7) — some group a whole category (e.g. Science).
  const activities = t.raw('activities') as Activity[];
  const cats = t.raw('cats') as Cat[];
  const [active, setActive] = useState(0);

  const visible = active === 0 ? activities : activities.filter((a) => a.catIdx === active);

  // Footer count reflects the real catalogue in lib/activities, not the
  // curated tile count (e.g. Science is shown as one grouped tile).
  const catalogue = getActivities(locale);
  const count = active === 0
    ? catalogue.length
    : catalogue.filter((a) => a.catIdx === active).length;

  return (
    <section id="academy" className="tz-section tz-page">
      <div className="tz-sect-hd">
        <div className="tz-sect-num">{t('num')}</div>
        <h2 className="tz-sect-h2">
          {t('titleMain')} <span className="tz-gold">{t('titleHighlight')}</span>
          <span className="tz-gold">.</span>
        </h2>
      </div>

      <p className="tz-acts-intro">{t('intro')}</p>

      <div className="tz-acts-filters">
        {cats.map((c) => (
          <button
            key={c.idx}
            type="button"
            className={`tz-acts-chip${active === c.idx ? ' on' : ''}`}
            onClick={() => setActive(c.idx)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="tz-bento">
        {visible.map((act, i) => {
          const href = act.slug
            ? `/academy/${act.catSlug}/${act.slug}`
            : `/academy/${act.catSlug}`;
          const imgSrc = act.img.startsWith('http') ? act.img : `/${act.img}`;
          return (
            <Link
              key={i}
              href={href}
              className={`tz-tile${act.size ? ` ${act.size}` : ''}`}
            >
              <Image
                src={imgSrc}
                alt={act.name}
                fill
                className="tz-tile-img"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="tz-tile-body">
                <span className="tz-tile-cat">{act.cat}</span>
                <h5 className="tz-tile-name">{act.name}</h5>
                <p className="tz-tile-desc">{act.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="tz-acts-foot">
        <span className="tz-acts-count">
          {count} {t('countLabel')}
        </span>
        <Link href="/academy" className="tz-btn-pill tz-acts-all">
          {t('allLink')} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
