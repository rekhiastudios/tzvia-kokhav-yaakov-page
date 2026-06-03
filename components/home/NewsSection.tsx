import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {getArticles} from '@/lib/articles';

export function NewsSection() {
  const t = useTranslations('news');
  const locale = useLocale();
  const items = getArticles(locale).slice(0, 4);

  return (
    <section id="news" className="tz-section tz-page">
      {/* Section header */}
      <div className="tz-sect-hd">
        <div className="tz-sect-num">{t('num')}</div>
        <h2 className="tz-sect-h2">
          {t('titleMain')} <span className="tz-gold">{t('titleHighlight')}</span>
          <span className="tz-gold">.</span>
        </h2>
      </div>

      {/* 4-column news grid — each card links to its article */}
      <div className="tz-news-grid">
        {items.map((item) => (
          <Link key={item.slug} href={`/news/${item.slug}`} className="tz-news-card">
            {/* Cover image (falls back to a tag placeholder) */}
            <div className="tz-news-thumb tz-ph">
              {item.coverImage ? (
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="tz-ph-inner">
                  <div>{item.tag.slice(0, 3)}</div>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="tz-news-body">
              <div className="tz-news-meta">
                <span className="tz-news-tag">{item.tag}</span>
                <span>{item.date}</span>
              </div>
              <h4>{item.title}</h4>
              <p className="tz-news-excerpt">{item.lede}</p>
              <span className="tz-news-read">
                {t('readLink')} <span className="arr">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer row */}
      <div className="tz-news-foot">
        <span>{t('countLabel')}</span>
        <Link className="tz-news-more" href="/news">
          {t('allLink')} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
