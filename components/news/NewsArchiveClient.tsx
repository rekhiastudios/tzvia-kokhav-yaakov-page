'use client';
import {useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import type {Article, ArticleTag} from '@/lib/articles';

// ── filter chip configuration ─────────────────────────────────────────────────
type FilterKey = 'ALL' | ArticleTag;

interface FilterOption {
  key: FilterKey;
  /** Key in the newsArchive translation namespace. */
  tKey: 'all' | 'ann' | 'ach' | 'eve' | 'alu';
}

const FILTERS: FilterOption[] = [
  {key: 'ALL', tKey: 'all'},
  {key: 'ANNOUNCEMENT', tKey: 'ann'},
  {key: 'ACHIEVEMENT', tKey: 'ach'},
  {key: 'EVENT', tKey: 'eve'},
  {key: 'ALUMNAE', tKey: 'alu'},
];

// ── article card ──────────────────────────────────────────────────────────────

function ArticleCard({article}: {article: Article}) {
  const t = useTranslations('newsArchive');
  return (
    <article className="tz-arc-card">
      <Link href={`/news/${article.slug}`} className="tz-arc-card-imgwrap" tabIndex={-1} aria-hidden="true">
        <div className="tz-arc-card-img">
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          <span className="tz-arc-card-tag-abbr">{article.tag.slice(0, 3)}</span>
        </div>
      </Link>
      <div className="tz-arc-card-body">
        <div className="tz-arc-card-meta">
          <span className="tz-arc-tag">{article.tag}</span>
          <span className="tz-arc-date">{article.date}</span>
        </div>
        <h3 className="tz-arc-card-title">
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="tz-arc-card-excerpt">{article.lede}</p>
        <Link href={`/news/${article.slug}`} className="tz-arc-read-link">
          {t('readArticle')} <span className="arr">→</span>
        </Link>
      </div>
    </article>
  );
}

// ── main archive component ────────────────────────────────────────────────────

export function NewsArchiveClient({articles}: {articles: Article[]}) {
  const t = useTranslations('newsArchive');
  const [activeTag, setActiveTag] = useState<FilterKey>('ALL');

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  const showFeatured = activeTag === 'ALL' || featured?.tag === activeTag;
  const gridArticles =
    activeTag === 'ALL' ? rest : rest.filter((a) => a.tag === activeTag);

  const shownCount =
    activeTag === 'ALL'
      ? articles.length
      : articles.filter((a) => a.tag === activeTag).length;

  return (
    <div className="tz-arc-page tz-page">
      {/* Page header */}
      <header className="tz-arc-hd">
        <div className="tz-sect-num">{t('eyebrow')}</div>
        <h1 className="tz-arc-h1">{t('h1')}</h1>
        <p className="tz-arc-desc">{t('desc')}</p>
      </header>

      {/* Filter bar */}
      <div className="tz-arc-bar">
        <div className="tz-arc-filters">
          {FILTERS.map(({key, tKey}) => (
            <button
              key={key}
              type="button"
              className={`tz-acts-chip${activeTag === key ? ' on' : ''}`}
              onClick={() => setActiveTag(key)}
            >
              {t(tKey)}
            </button>
          ))}
        </div>
        <div className="tz-arc-year-wrap">
          <span className="tz-arc-year-label">{t('yearLabel')}</span>
          <span className="tz-arc-year-val">2026</span>
        </div>
      </div>

      <div className="tz-arc-sep" />

      {/* Featured article hero */}
      {featured && showFeatured && (
        <article className="tz-arc-featured">
          <Link href={`/news/${featured.slug}`} className="tz-arc-feat-imgwrap">
            <div className="tz-arc-feat-img w-full">
              {featured.coverImage && (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="50vw"
                />
              )}
            </div>
          </Link>
          <div className="tz-arc-feat-body">
            <div className="tz-arc-feat-meta">
              <span className="tz-arc-tag">{featured.tag}</span>
              <span className="tz-arc-date">{featured.date}</span>
              <span className="tz-arc-feat-badge">{t('featuredBadge')}</span>
            </div>
            <h2 className="tz-arc-feat-h2">
              <Link href={`/news/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="tz-arc-feat-lede">{featured.lede}</p>
            <div className="tz-arc-feat-foot">
              <Link href={`/news/${featured.slug}`} className="tz-arc-read-link">
                {t('readFeature')} <span className="arr">→</span>
              </Link>
              <span className="tz-arc-rt">{featured.readTime} {t('minRead')}</span>
            </div>
          </div>
        </article>
      )}

      {gridArticles.length > 0 && <div className="tz-arc-sep" />}

      {/* Article grid */}
      {gridArticles.length > 0 && (
        <div className="tz-arc-grid">
          {gridArticles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {/* Count footer */}
      <div className="tz-arc-foot">
        <span className="tz-arc-count">
          {String(shownCount).padStart(2, '0')} / {String(articles.length).padStart(2, '0')}{' '}
          {t('itemsLabel')}
        </span>
      </div>
    </div>
  );
}
