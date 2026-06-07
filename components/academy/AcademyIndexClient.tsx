'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import type {ActivityMeta, CategorySlug} from '@/lib/activities';

interface AcademyCat {
  slug: string;
  idx: number;
  label: string;
  desc: string;
}

interface Props {
  activities: ActivityMeta[];
  initialCategorySlug?: CategorySlug;
}

const BADGE_CLASS: Record<string, string> = {
  FEATURED: 'tz-acp-badge--featured',
  ONLINE: 'tz-acp-badge--online',
  'IN-PERSON': 'tz-acp-badge--inperson',
};

function ActivityCard({act}: {act: ActivityMeta}) {
  return (
    <Link
      href={`/academy/${act.catSlug}/${act.slug}`}
      className={`tz-acp-card${act.size ? ` ${act.size}` : ''}`}
    >
      <div className="tz-acp-card-bg">
        <Image
          src={act.img}
          alt={act.name}
          fill
          className="tz-acp-card-img"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      {act.badge && (
        <span className={`tz-acp-badge ${BADGE_CLASS[act.badge] ?? ''}`}>
          {act.badge}
        </span>
      )}
      <div className="tz-acp-card-bm" aria-hidden="true">□</div>
      <div className="tz-acp-card-body">
        <span className="tz-acp-card-cat">{act.cat}</span>
        <h3 className="tz-acp-card-name">{act.name}<span className="tz-gold">.</span></h3>
        <p className="tz-acp-card-desc">{act.desc}</p>
        {(act.grades || act.schedule || act.since) && (
          <div className="tz-acp-card-meta">
            {act.grades && <span>GRADES {act.grades}</span>}
            {act.schedule && <span>{act.schedule}</span>}
            {act.since && <span>SINCE {act.since}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}

export function AcademyIndexClient({activities, initialCategorySlug}: Props) {
  const t = useTranslations('academyPage');
  const cats = t.raw('categories') as AcademyCat[];

  const initialIdx = initialCategorySlug
    ? (cats.find((c) => c.slug === initialCategorySlug)?.idx ?? 0)
    : 0;
  const [activeIdx, setActiveIdx] = useState(initialIdx);

  const visibleCats =
    activeIdx === 0
      ? cats
      : cats.filter((c) => c.idx === activeIdx);

  const totalVisible =
    activeIdx === 0
      ? activities.length
      : activities.filter((a) => a.catIdx === activeIdx).length;

  return (
    <div className="tz-acp-root">

      {/* ── 1. Hero ── */}
      <header className="tz-acp-hero">
        <div aria-hidden="true" className="tz-acp-hero-wm">{t('heroWatermark')}</div>
        <div className="tz-acp-hero-inner tz-page">
          <nav className="tz-acp-crumb" aria-label="breadcrumb">
            <Link href="/">{t('breadcrumbHome')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('breadcrumbAcademy')}</span>
          </nav>
          <p className="tz-acp-hero-eyebrow">{'// '}{t('eyebrow')}</p>
          <p className="tz-acp-hero-sub-eyebrow">{'// '}{t('heroSubEyebrow')}</p>
          <div className="tz-acp-hero-content">
            <div className="tz-acp-hero-lhs">
              <h1 className="tz-acp-hero-h1">
                <span className="tz-acp-hero-h1-line">{t('h1Main')}</span>
                <span className="tz-acp-hero-h1-gold">{t('h1Gold')}.</span>
              </h1>
              <p className="tz-acp-hero-desc">{t('intro')}</p>
            </div>
            <div className="tz-acp-hero-stats-card">
              <div className="tz-acp-hero-stat">
                <span className="tz-acp-hero-stat-val">{activities.length}</span>
                <span className="tz-acp-hero-stat-label">{t('countActivities')}</span>
              </div>
              <div className="tz-acp-hero-stat">
                <span className="tz-acp-hero-stat-val">{cats.length}</span>
                <span className="tz-acp-hero-stat-label">{t('countCategories')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. Body ── */}
      <div className="tz-acp-body tz-page">
        {/* ── Filter bar ── */}
        <div className="tz-acp-filterrow">
          <div className="tz-acts-filters">
            <button
              type="button"
              className={`tz-acts-chip${activeIdx === 0 ? ' on' : ''}`}
              onClick={() => setActiveIdx(0)}
            >
              {t('allLabel')}
            </button>
            {cats.map((c) => (
              <button
                key={c.idx}
                type="button"
                className={`tz-acts-chip${activeIdx === c.idx ? ' on' : ''}`}
                onClick={() => setActiveIdx(c.idx)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <span className="tz-acp-count">
            {totalVisible} {t('countActivities')} · {visibleCats.length} {t('countCategories')}
          </span>
        </div>

        <div className="tz-acp-sep" />

        {/* ── Category groups ── */}
        {visibleCats.map((cat, gi) => {
          const catActivities = activities.filter((a) => a.catIdx === cat.idx);
          const groupNum = String(gi + 1).padStart(2, '0');
          return (
            <div key={cat.slug} className="tz-acp-group">
              <div className="tz-acp-group-hd">
                <div className="tz-acp-group-meta">
                  <span className="tz-acp-group-num">{'// '}{groupNum}</span>
                  <span className="tz-acp-group-line" aria-hidden="true" />
                  <span className="tz-acp-group-count">
                    {catActivities.length} {t('activitiesUnit').toUpperCase()}
                  </span>
                </div>
                <div className="tz-acp-group-name-wrap">
                  <span className="tz-acp-group-wm" aria-hidden="true">{cat.label}</span>
                  <p className="tz-acp-group-desc">{cat.desc}</p>
                </div>
              </div>

              <div
                className="tz-acp-cards"
                data-cat={cat.slug}
                data-count={catActivities.length}
              >
                {catActivities.map((act) => (
                  <ActivityCard key={act.slug} act={act} />
                ))}
              </div>
            </div>
          );
        })}

        {/* ── Advisor CTA ── */}
        <div className="tz-acp-advisor">
          <div className="tz-acp-advisor-inner">
            <p className="tz-acp-advisor-eyebrow">{'// '}{t('advisorEyebrow')}</p>
            <h2 className="tz-acp-advisor-title">{t('advisorTitle')}</h2>
            <p className="tz-acp-advisor-desc">{t('advisorDesc')}</p>
            <div className="tz-acp-advisor-btns">
              <Link href="/contact" className="tz-btn-pill">
                {t('advisorCta')} <span>→</span>
              </Link>
              <Link href="/resources" className="tz-acp-advisor-ghost">
                {t('advisorGuide')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
