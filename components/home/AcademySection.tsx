'use client';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useState} from 'react';
import {Link} from '@/i18n/navigation';

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
  const activities = t.raw('activities') as Activity[];
  const cats = t.raw('cats') as Cat[];
  const [active, setActive] = useState(0);

  const visible = active === 0 ? activities : activities.filter((a) => a.catIdx === active);

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
          return (
            <Link
              key={i}
              href={href}
              className={`tz-tile${act.size ? ` ${act.size}` : ''}`}
            >
              <Image
                src={`/${act.img}`}
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
          {visible.length} {t('countLabel')}
        </span>
        <Link href="/academy" className="tz-btn-pill tz-acts-all">
          {t('allLink')} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
