import {useTranslations} from 'next-intl';

interface NewsItem {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

export function NewsSection() {
  const t = useTranslations('news');
  const items = t.raw('items') as NewsItem[];

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

      {/* 4-column news grid */}
      <div className="tz-news-grid">
        {items.map((item, i) => (
          <article key={i} className="tz-news-card">
            {/* Image placeholder */}
            <div className="tz-news-thumb tz-ph">
              <div className="tz-ph-inner">
                <div>{item.tag.slice(0, 3)}</div>
              </div>
            </div>

            {/* Card body */}
            <div className="tz-news-body">
              <div className="tz-news-meta">
                <span className="tz-news-tag">{item.tag}</span>
                <span>{item.date}</span>
              </div>
              <h4>{item.title}</h4>
              <p className="tz-news-excerpt">{item.excerpt}</p>
              <a className="tz-news-read" href="#">
                {t('readLink')} <span className="arr">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Footer row */}
      <div className="tz-news-foot">
        <span>{t('countLabel')}</span>
        <a className="tz-news-more" href="#">
          {t('allLink')} <span>→</span>
        </a>
      </div>
    </section>
  );
}
