import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {getArticle, getArticles, getRelatedArticles} from '@/lib/articles';
import {ArticleBody} from '@/components/news/ArticleBody';
import {buildPageMetadata, SITE_NAME} from '@/lib/seo';

export async function generateStaticParams({
  params,
}: {
  params: {locale: string};
}) {
  const {locale} = params;
  return getArticles(locale).map((a) => ({slug: a.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const article = getArticle(locale, slug);
  if (!article) return {};
  return buildPageMetadata({
    locale,
    path: `/news/${slug}`,
    title: `${article.title} — ${SITE_NAME[locale as 'he' | 'en']}`,
    description: article.lede,
    image: article.coverImage,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const article = getArticle(locale, slug);
  if (!article) notFound();

  const t = await getTranslations({locale, namespace: 'newsArchive'});
  const related = getRelatedArticles(locale, slug, 3);

  return (
    <article className="tz-art-page tz-page">
      {/* Breadcrumb */}
      <nav className="tz-art-crumb" aria-label="breadcrumb">
        <Link href="/news">{t('dispatch')}</Link>
        <span aria-hidden="true">·</span>
        <span>{article.tag}</span>
        <span aria-hidden="true">·</span>
        <span>{t('thisArticle')}</span>
      </nav>

      {/* Article header */}
      <header className="tz-art-header">
        <div className="tz-art-meta">
          <span className="tz-arc-tag">{article.tag}</span>
          <span className="tz-arc-date">{article.date}</span>
          <span className="tz-art-rt">{article.readTime} {t('minRead').toUpperCase()}</span>
        </div>
        <h1 className="tz-art-h1">{article.title}</h1>
        <p className="tz-art-lede">{article.lede}</p>
        {article.author && (
          <div className="tz-art-author">
            <div className="tz-art-av" aria-hidden="true">
              {article.author.initials}
            </div>
            <div>
              <div className="tz-art-author-name">{article.author.name}</div>
              <div className="tz-art-author-role">
                {article.author.role.toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero image */}
      {article.coverImage && (
        <div className="tz-art-hero">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, calc(100vw - 112px)"
          />
        </div>
      )}

      {/* Body + sidebar */}
      <div className="tz-art-layout">
        <div className="tz-art-body">
          <ArticleBody blocks={article.body} />
        </div>

        <aside className="tz-art-sidebar">
          {article.toc && article.toc.length > 0 && (
            <div className="tz-art-sb-sec">
              <div className="tz-art-sb-eyebrow">{'// '}{t('inThisArticle')}</div>
              <ul className="tz-art-toc">
                {article.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.facts && article.facts.length > 0 && (
            <div className="tz-art-sb-sec">
              <div className="tz-art-sb-eyebrow">{'// '}{t('theFacts')}</div>
              <div className="tz-art-facts">
                {article.facts.map((f) => (
                  <div key={f.label} className="tz-art-fact">
                    <span className="tz-art-fact-label">{f.label}</span>
                    <span className="tz-art-fact-value">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="tz-art-sb-sec">
              <div className="tz-art-sb-eyebrow">{'// '}{t('tagsLabel')}</div>
              <div className="tz-art-tagslist">
                {article.tags.map((tag) => (
                  <span key={tag} className="tz-art-tagtag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="tz-art-sb-sec tz-art-nl">
            <div className="tz-art-sb-eyebrow">{'// '}{t('newsletter')}</div>
            <p>{t('nlDesc')}</p>
            <div className="tz-art-nl-form">
              <input type="text" placeholder={t('nlPlaceholder')} readOnly />
              <Link href="/news">{t('subscribe')} →</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="tz-art-related">
          <div className="tz-art-related-hd">
            <span className="tz-art-related-label">{t('keepReading')}</span>
            <Link href="/news" className="tz-arc-read-link">
              {t('allDispatches')} <span className="arr">→</span>
            </Link>
          </div>
          <div className="tz-arc-grid">
            {related.map((a) => (
              <article key={a.slug} className="tz-arc-card">
                <Link
                  href={`/news/${a.slug}`}
                  className="tz-arc-card-imgwrap"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="tz-arc-card-img">
                    {a.coverImage && (
                      <Image
                        src={a.coverImage}
                        alt={a.title}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                    )}
                    <span className="tz-arc-card-tag-abbr">{a.tag.slice(0, 3)}</span>
                  </div>
                </Link>
                <div className="tz-arc-card-body">
                  <div className="tz-arc-card-meta">
                    <span className="tz-arc-tag">{a.tag}</span>
                    <span className="tz-arc-date">{a.date}</span>
                  </div>
                  <h3 className="tz-arc-card-title">
                    <Link href={`/news/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p className="tz-arc-card-excerpt">{a.lede}</p>
                  <Link href={`/news/${a.slug}`} className="tz-arc-read-link">
                    {t('readArticle')} <span className="arr">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
