'use client';

/**
 * NavBar
 * ------
 * Top-of-page navigation for the Ulpenat Tzvia site.
 *
 * Visual behavior — two states driven by scroll position:
 *   1. "rest"     — floats inset from the viewport edges as a transparent
 *                   pill, sitting over the Hero's 3D scene.
 *   2. "scrolled" — pinned flush to the top, solid navy with a blurred
 *                   backdrop, ready to read against light page content.
 *
 * Interactive features:
 *   • Search — hover over the search button to expand a rounded input bar.
 *     The pill grows and pushes the other cluster items; collapses when the
 *     cursor leaves and no query is active (CSS hover + focus-within).
 *   • Menu overlay — click the MENU button to slide in a full-screen panel
 *     from the inline-start edge with staggered nav links.
 */

import {useEffect, useMemo, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, Menu, Search, X} from 'lucide-react';
import {useLocale, useMessages, useTranslations} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import {cn} from '@/lib/utils';
import {buildSearchIndex, searchEntries, type SearchType} from '@/lib/search';
import Image from 'next/image';

const SCROLL_THRESHOLD_PX = 72;

export function NavBar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === 'he';

  const otherLocale = locale === 'he' ? 'en' : 'he';

  const isHomePage = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape key closes the menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Search ────────────────────────────────────────────────────────────────
  const ts = useTranslations('search');
  const messages = useMessages();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchIndex = useMemo(
    () => buildSearchIndex(locale, messages as Parameters<typeof buildSearchIndex>[1]),
    [locale, messages],
  );
  const results = useMemo(() => searchEntries(searchIndex, query), [searchIndex, query]);
  const showResults = searchOpen && query.trim().length > 0;

  const typeLabel = (type: SearchType) =>
    ts(
      type === 'page'
        ? 'typePage'
        : type === 'article'
          ? 'typeArticle'
          : type === 'activity'
            ? 'typeActivity'
            : 'typeEvent',
    );

  function closeSearch() {
    setSearchOpen(false);
    setQuery('');
  }

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [searchOpen]);

  function onSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      closeSearch();
      searchInputRef.current?.blur();
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      router.push(results[0].href);
      closeSearch();
    }
  }

  const navLinks = [
    {label: t('about'),       href: '/about-us'},
    {label: t('academy'),     href: '/academy'},
    {label: t('admissions'),  href: '/admissions'},
    {label: t('resources'),   href: '/resources'},
    {label: t('news'),        href: '/news'},
    {label: t('rent'),        href: '/facilities/rent'},
    {label: t('contact'),     href: '/contact'},
  ];

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <>
      <div className={cn('navbar-frame', scrolled && 'is-scrolled')}>
        <nav className="navbar" aria-label={t('brand')}>
          {/* Action cluster — search, menu, language toggle */}
          <div className="navbar-cluster">
            {/* Search: button first so in RTL it anchors at inline-start (right),
                input slides out toward the end (left), displacing menu + lang. */}
            <div
              className={cn('navbar-search-wrap', searchOpen && 'is-active')}
              role="search"
              ref={searchWrapRef}
            >
              <button
                type="button"
                className="navbar-icon-btn navbar-search-btn"
                aria-label={t('search')}
                aria-expanded={showResults}
                onClick={() => {
                  setSearchOpen(true);
                  searchInputRef.current?.focus();
                }}
              >
                <Search aria-hidden="true" strokeWidth={2.2} />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                className="navbar-search-input"
                placeholder={ts('placeholder')}
                aria-label={t('search')}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={onSearchKeyDown}
              />

              {showResults && (
                <div className="navbar-search-results" role="listbox">
                  {results.length === 0 ? (
                    <p className="navbar-search-empty">{ts('noResults')}</p>
                  ) : (
                    results.map((r, i) => (
                      <Link
                        key={`${r.href}-${i}`}
                        href={r.href}
                        role="option"
                        className="navbar-search-result"
                        style={{'--i': i} as React.CSSProperties}
                        onClick={closeSearch}
                      >
                        <span className="navbar-search-result-type">{typeLabel(r.type)}</span>
                        <span className="navbar-search-result-text">
                          <span className="navbar-search-result-title">{r.title}</span>
                          {r.subtitle && (
                            <span className="navbar-search-result-sub">{r.subtitle}</span>
                          )}
                        </span>
                        <ChevronIcon className="navbar-search-result-arr" aria-hidden="true" strokeWidth={2} />
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              className="navbar-menu-btn"
              aria-label={t('menu')}
              aria-expanded={menuOpen}
              aria-controls="main-menu-overlay"
              onClick={() => setMenuOpen(true)}
            >
              <span>{t('menuLabel')}</span>
              <Menu aria-hidden="true" strokeWidth={2.2} />
            </button>

            {/* Language toggle — preserves current path across locale swap */}
            <Link
              href={pathname}
              locale={otherLocale}
              className="navbar-lang"
              aria-label={t('language')}
              lang={otherLocale}
            >
              {otherLocale === 'he' ? 'עב' : 'EN'}
            </Link>
          </div>

          {/* Logo group — links home */}
          <Link href="/" className="navbar-logo" aria-label={t('home')}>
            <span className="navbar-logo-text mt-2">
              <span className="navbar-logo-text-he" lang="he">
                {t('logoHe')}
              </span>
              <span className="navbar-logo-text-en" lang="en">
                {t('logoEn')}
              </span>
            </span>
            <Image
              src="/NoamTzviaLogo.png"
              alt="Ulpenat Tzvia Kochav Yaakov"
              width={1304}
              height={1093}
              className="h-14 w-auto object-contain"
            />
          </Link>
        </nav>
      </div>

      {/* ── Full-screen menu overlay ──────────────────────────────────────── */}
      <div
        id="main-menu-overlay"
        className={cn('menu-overlay', menuOpen && 'is-open')}
        role="dialog"
        aria-modal="true"
        aria-label={t('menu')}
        aria-hidden={!menuOpen}
      >
        {/* Close button — top inline-start corner (top-right in RTL) */}
        <button
          type="button"
          className="menu-overlay-close"
          aria-label={t('menuClose')}
          onClick={() => setMenuOpen(false)}
        >
          <X aria-hidden="true" strokeWidth={1.5} />
        </button>

        {/* Nav links */}
        <nav className="menu-overlay-nav" aria-label={t('brand')}>
          {navLinks.map(({label, href}) => {
            const content = (
              <>
                <span>{label}</span>
                <ChevronIcon className="menu-overlay-chevron" aria-hidden="true" strokeWidth={1.5} />
              </>
            );
            return href.startsWith('/') ? (
              <Link key={href} href={href} className="menu-overlay-link" onClick={() => setMenuOpen(false)}>
                {content}
              </Link>
            ) : (
              <a key={href} href={href} className="menu-overlay-link" onClick={() => setMenuOpen(false)}>
                {content}
              </a>
            );
          })}
        </nav>

        {/* Bottom branding watermark */}
        <div className="menu-overlay-bottom">
          <Image
            src="/NoamTzviaLogo.png"
            alt=""
            aria-hidden="true"
            width={1304}
            height={1093}
            className="h-10 w-auto opacity-30"
          />
          <span className="menu-overlay-bottom-name">{t('logoHe')}</span>
        </div>
      </div>
    </>
  );
}
