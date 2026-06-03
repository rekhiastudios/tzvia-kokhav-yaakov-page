'use client';

/**
 * ─── FUTURE DATABASE SCHEMA ──────────────────────────────────────────────────
 *
 * When this section is backed by a real data store each event record should
 * carry the following fields.  The current implementation reads all data from
 * the i18n bundles (messages/{locale}.json → calendar.events[]).
 *
 * ─────────────────────────────────────────────────────────────────────────── */
export interface CalEventRecord {
  /** UUID or URL-safe slug. Primary key. */
  id: string;
  /** Absolute ISO date "YYYY-MM-DD". Replaces the current `day` integer + hardcoded month. */
  date: string;
  /** Display start time, e.g. "17:00". Use "ALL_DAY" sentinel for all-day events. */
  startTime: string;
  /** Optional end time, e.g. "19:30". Omit for open-ended events. */
  endTime?: string;
  /** Localized event title — Hebrew. */
  titleHe: string;
  /** Localized event title — English. */
  titleEn: string;
  /** Short body copy — Hebrew (≤ 200 chars recommended for card display). */
  descHe: string;
  /** Short body copy — English. */
  descEn: string;
  /** Venue / location string — Hebrew. */
  locationHe: string;
  /** Venue / location string — English. */
  locationEn: string;
  /**
   * Determines color treatment and RSVP button style:
   *   "public"    → gold accent, filled dark RSVP button; open to all families.
   *   "community" → navy-soft accent, outlined RSVP; students & staff only.
   */
  category: 'public' | 'community';
  /** Absolute URL for a cover photo / media thumbnail. */
  mediaUrl?: string;
  /** External RSVP or ticketing URL. Absent = no RSVP link rendered. */
  rsvpUrl?: string;
  /** Only published events appear on the public site. */
  published: boolean;
  /** ISO timestamp used to invalidate CDN/ISR caches after edits. */
  updatedAt: string;
}

/* ─── Lightweight shape currently read from i18n bundles ────────────────── */
interface CalEvent {
  day: number;   // Day-of-month within the prototype month (June 2026)
  time: string;  // Display start time, e.g. "17:00" or "ALL DAY" / "כל היום"
  title: string; // Localized event title
  alt: boolean;  // true → community event (navy-soft accent + outlined RSVP)
  when: string;  // Pre-formatted "DATE · TIME · LOCATION" display string
  desc: string;  // Short description
}

/** All prototype events live in June 2026. */
const DATA_YEAR = 2026;
const DATA_MONTH = 5; // 0-indexed → June

/** "Today" marker — June 2, 2026. */
const TODAY_DAY = 2;

/** Day the Upcoming view opens on: the month's single confirmed event (last day of classes). */
const FOCUS_DAY = 20;

/** Returns the Sunday that begins the calendar week containing `date`. */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay()); // rewind to Sunday (getDay() == 0)
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Extracts the location segment from the "DATE · TIME · LOCATION" `when`
 * string stored in the i18n bundles.  Returns empty string if unavailable.
 */
function parseLoc(when: string): string {
  const parts = when.split(' · ');
  return parts.length >= 3 ? parts.slice(2).join(' · ') : '';
}

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function CalendarSection() {
  const t = useTranslations('calendar');
  const locale = useLocale();
  const intlLocale = locale === 'he' ? 'he-IL' : 'en-US';

  const rawEvents = t.raw('events') as CalEvent[];
  const days = t.raw('days') as string[];

  /* ── View state ──────────────────────────────────────────────────────────── */
  type View = 'month' | 'upcoming';
  const [activeView, setActiveView] = useState<View>('month');

  /** First day of the displayed month — drives the Month grid. */
  const [navDate, setNavDate] = useState<Date>(() => new Date(DATA_YEAR, DATA_MONTH, 1));

  /** Sunday starting the displayed week — drives the Upcoming list. */
  const [weekStart, setWeekStart] = useState<Date>(
    () => getWeekStart(new Date(DATA_YEAR, DATA_MONTH, FOCUS_DAY)),
  );

  /* ── Force Upcoming view on mobile ──────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setActiveView('upcoming');
    };
    sync(mq);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* ── Navigation (arrows) ─────────────────────────────────────────────────── */
  function navigate(dir: 1 | -1) {
    if (activeView === 'month') {
      setNavDate(d => new Date(d.getFullYear(), d.getMonth() + dir, 1));
    } else {
      setWeekStart(ws => {
        const d = new Date(ws);
        d.setDate(d.getDate() + dir * 7);
        return d;
      });
    }
  }

  function switchView(view: View) {
    if (view === 'month' && window.matchMedia('(max-width: 767px)').matches) return;
    if (view === 'upcoming' && activeView !== 'upcoming') {
      // Open Upcoming on the week of the confirmed event.
      setWeekStart(getWeekStart(new Date(DATA_YEAR, DATA_MONTH, FOCUS_DAY)));
    }
    setActiveView(view);
  }

  /* ── Month view computations ─────────────────────────────────────────────── */
  const year = navDate.getFullYear();
  const month = navDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay(); // 0 = Sunday
  const isDataMonth = year === DATA_YEAR && month === DATA_MONTH;

  const eventMap = new Map<number, CalEvent>(
    isDataMonth ? rawEvents.map(e => [e.day, e]) : [],
  );

  const totalCells = startOffset + daysInMonth;
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(Math.ceil(totalCells / 7) * 7 - totalCells).fill(null),
  ];

  const monthDisplayLabel = new Intl.DateTimeFormat(intlLocale, { month: 'long' })
    .format(navDate)
    .toUpperCase();

  /* ── Upcoming view computations ──────────────────────────────────────────── */
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  // Only events whose absolute date falls within [weekStart, weekEnd) are shown.
  const weekEvents = rawEvents.filter(e => {
    const d = new Date(DATA_YEAR, DATA_MONTH, e.day);
    return d >= weekStart && d < weekEnd;
  });

  // Last day of the displayed week (Saturday)
  const wkEndDisplay = new Date(weekStart);
  wkEndDisplay.setDate(wkEndDisplay.getDate() + 6);

  const wkMonthAbbr = new Intl.DateTimeFormat(intlLocale, { month: 'short' })
    .format(weekStart)
    .toUpperCase();

  // Short header label: "7–13 JUN" / "7–13 יוני"
  const weekDisplayLabel = `${weekStart.getDate()}–${wkEndDisplay.getDate()} ${wkMonthAbbr}`;

  // Long label for the footer: "June 7–13, 2026" / "7–13 יוני 2026"
  const wkMonthFull = new Intl.DateTimeFormat(intlLocale, { month: 'long' }).format(weekStart);
  const weekFooterLabel =
    locale === 'he'
      ? `${weekStart.getDate()}–${wkEndDisplay.getDate()} ${wkMonthFull} ${weekStart.getFullYear()}`
      : `${wkMonthFull} ${weekStart.getDate()}–${wkEndDisplay.getDate()}, ${weekStart.getFullYear()}`;

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <section id="calendar" className="tz-section tz-page">
      {/* Section header */}
      <div className="tz-sect-hd">
        <div className="tz-sect-num">{t('num')}</div>
        <h2 className="tz-sect-h2">
          {t('titleMain')} <span className="tz-gold">{t('titleHighlight')}</span>
          <span className="tz-gold">.</span>
        </h2>
      </div>

      {/* ── Shared toolbar ───────────────────────────────────────────────────── */}
      <div className="tz-cal-head">
        {/* Dynamic label: month name (Month view) or week range (Upcoming view) */}
        <div className="tz-cal-month">
          {activeView === 'month' ? (
            <>{monthDisplayLabel} <span className="tz-year">{year}</span></>
          ) : (
            weekDisplayLabel
          )}
        </div>

        {/* View tabs */}
        <div className="tz-cal-views">
          <button
            type="button"
            className={`tz-cal-view${activeView === 'upcoming' ? ' active' : ''}`}
            onClick={() => switchView('upcoming')}
          >
            {t('viewUpcoming')}
          </button>
          <button
            type="button"
            className={`tz-cal-view tz-cal-view-month${activeView === 'month' ? ' active' : ''}`}
            onClick={() => switchView('month')}
          >
            {t('viewMonth')}
          </button>
        </div>

        {/* Navigation arrows — move between months or weeks depending on active view */}
        <div className="tz-nav-controls">
          <button
            className="tz-nav-btn"
            type="button"
            onClick={() => navigate(-1)}
            aria-label={locale === 'he' ? 'קודם' : 'Previous'}
          >
            ‹
          </button>
          <button
            className="tz-nav-btn"
            type="button"
            onClick={() => navigate(1)}
            aria-label={locale === 'he' ? 'הבא' : 'Next'}
          >
            ›
          </button>
        </div>
      </div>

      {/* ════════════════════════ MONTH VIEW ═══════════════════════════════════ */}
      {activeView === 'month' && (
        <>
          <div className="tz-cal-board">
            {/* Day-of-week headers */}
            <div className="tz-cal-dow">
              {days.map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="tz-cal-grid">
              {cells.map((day, i) => {
                if (day === null) return <div key={i} className="tz-day empty" />;
                const ev = eventMap.get(day);
                const isToday = isDataMonth && day === TODAY_DAY;
                return (
                  <div
                    key={i}
                    className={`tz-day${ev ? ' has-event' : ''}${isToday ? ' today' : ''}`}
                  >
                    <div className="tz-day-num">{String(day).padStart(2, '0')}</div>
                    {ev && (
                      <div className={`tz-event${ev.alt ? ' alt' : ''}`}>
                        <span className="tz-event-time">{ev.time}</span>
                        {ev.title}
                      </div>
                    )}
                    {ev && (
                      <div className="tz-hover-card">
                        <div className="tz-hc-media tz-ph">
                          <div className="tz-ph-inner">
                            <div>EVENT MEDIA</div>
                          </div>
                        </div>
                        <div className="tz-hc-body">
                          <div className="tz-hc-meta">
                            {ev.alt ? t('labelCommunity') : t('labelPublic')}
                          </div>
                          <div className="tz-hc-title">{ev.title}</div>
                          <div className="tz-hc-when">{ev.when}</div>
                          <div className="tz-hc-desc">{ev.desc}</div>
                          <a className="tz-hc-cta" href="#">
                            {t('rsvp')} <span>→</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="tz-cal-foot">
            <div className="tz-cal-legend">
              <div className="tz-legend-item">
                <span className="tz-legend-sw" />
                {t('legendPublic')}
              </div>
              <div className="tz-legend-item">
                <span className="tz-legend-sw alt" />
                {t('legendCommunity')}
              </div>
            </div>
            <span>{isDataMonth ? t('eventsCount') : `0 ${t('eventsUnit')}`}</span>
          </div>
        </>
      )}

      {/* ════════════════════════ UPCOMING VIEW ════════════════════════════════ */}
      {activeView === 'upcoming' && (
        <div className="tz-ev-wrap">
          {weekEvents.length === 0 ? (
            /* Empty state — no events in the selected week */
            <div className="tz-ev-empty">
              <p className="tz-ev-empty-title">{t('noEventsTitle')}</p>
              <p className="tz-ev-empty-msg">{t('noEventsMsg')}</p>
            </div>
          ) : (
            <ul className="tz-ev-list">
              {weekEvents.map(ev => {
                const evDate = new Date(DATA_YEAR, DATA_MONTH, ev.day);
                const dowStr = new Intl.DateTimeFormat(intlLocale, { weekday: 'long' })
                  .format(evDate)
                  .toUpperCase();
                const moStr = new Intl.DateTimeFormat(intlLocale, { month: 'short' })
                  .format(evDate)
                  .toUpperCase();
                const locStr = parseLoc(ev.when);

                return (
                  <li
                    key={ev.day}
                    className={`tz-ev-row${!ev.alt ? ' featured' : ' community'}`}
                  >
                    {/* Col 1 — Date box: big day number + month abbr + day of week */}
                    <div className="tz-ev-date-box">
                      <div className="tz-ev-day">{String(ev.day).padStart(2, '0')}</div>
                      <div className="tz-ev-mo">{moStr}</div>
                      <div className="tz-ev-dow">{dowStr}</div>
                    </div>

                    {/* Col 2 — Event body: category badge + title + description */}
                    <div className="tz-ev-body">
                      <div className="tz-ev-cat">
                        <span className="tz-ev-badge">
                          {ev.alt ? t('labelCommunity') : t('labelPublic')}
                        </span>
                      </div>
                      <h5 className="tz-ev-title">{ev.title}</h5>
                      <p className="tz-ev-desc">{ev.desc}</p>
                    </div>

                    {/* Col 3 — Meta: time + location rows */}
                    <div className="tz-ev-meta">
                      <div className="tz-ev-meta-row">
                        <span className="tz-ev-lbl">{t('metaTime')}</span>
                        {ev.time}
                      </div>
                      {locStr && (
                        <div className="tz-ev-meta-row">
                          <span className="tz-ev-lbl">{t('metaWhere')}</span>
                          {locStr}
                        </div>
                      )}
                    </div>

                    {/* Col 4 — RSVP button (filled for public, outlined for community) */}
                    <button type="button" className="tz-ev-rsvp">
                      {t('rsvp')} <span aria-hidden="true">→</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Footer row */}
          <div className="tz-ev-foot">
            <span>
              {weekEvents.length} {t('eventsUnit').toUpperCase()} · {weekFooterLabel.toUpperCase()}
            </span>
            <a className="tz-ev-all-link" href="#">
              {t('allEventsLink')} <span className="tz-ev-arr" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Legend (consistent with Month view) */}
          <div className="tz-cal-foot" style={{ marginTop: '1.25rem' }}>
            <div className="tz-cal-legend">
              <div className="tz-legend-item">
                <span className="tz-legend-sw" />
                {t('legendPublic')}
              </div>
              <div className="tz-legend-item">
                <span className="tz-legend-sw alt" />
                {t('legendCommunity')}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
