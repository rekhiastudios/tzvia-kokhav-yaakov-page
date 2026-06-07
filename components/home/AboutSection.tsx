'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import Image from 'next/image';

// Rotating gallery — 4 portrait plates from Cloudinary
// (folder "Campus Images Enhanced/3:4 ratio/About Us Home Page Section").
// They cycle every ROTATE_MS: the last frame moves up into the main slot,
// the main image drops into the first frame, and so on.
const CLD = 'https://res.cloudinary.com/dcpeggch3/image/upload';
const GALLERY = [
  `${CLD}/v1780819277/ChatGPT_Image_Jun_7_2026_11_00_29_AM_v6nxyp.png`,
  `${CLD}/v1780818928/ChatGPT_Image_Jun_7_2026_10_55_07_AM_ibimqs.png`,
  `${CLD}/v1780659516/ChatGPT_Image_Jun_5_2026_02_37_49_PM_vo9hfl.png`,
  `${CLD}/v1780659197/ChatGPT_Image_Jun_5_2026_11_45_30_AM_p7lztm.png`,
];
const ROTATE_MS = 5000;

// Crossfades to a new src: the outgoing image stays beneath while the new
// one fades in on top, then the old layer is dropped.
function GallerySlot({src, alt, sizes}: {src: string; alt: string; sizes: string}) {
  const [current, setCurrent] = useState(src);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    if (src === current) return;
    setPrevious(current);
    setCurrent(src);
    const id = setTimeout(() => setPrevious(null), 700);
    return () => clearTimeout(id);
  }, [src, current]);

  return (
    <>
      {previous && (
        <Image
          key={previous}
          src={previous}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover tz-about-slot-img"
        />
      )}
      <Image
        key={current}
        src={current}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover tz-about-slot-img tz-about-slot-enter"
      />
    </>
  );
}

export function AboutSection() {
  const t = useTranslations('about');
  const intro = t.raw('intro') as string[];
  const captions = t.raw('captions') as string[];
  // Per-image text (index-aligned to GALLERY) travels with each photo as it
  // rotates; the FRAME 0X labels stay fixed to their slot position.
  const frames = t.raw('frames') as Array<{title: string; caption: string}>;
  const frameLabels = t.raw('frameLabels') as string[];

  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset((o) => o + 1), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const n = GALLERY.length;
  // Position 0 is the main image; 1..3 are the frames. Increasing the offset
  // pulls each image one slot "down" the queue (last frame → main).
  const indexFor = (pos: number) => (((pos - offset) % n) + n) % n;
  const imageFor = (pos: number) => GALLERY[indexFor(pos)];
  const mainIndex = indexFor(0);

  return (
    <section id="about" className="tz-about tz-dark">

      {/* Masthead */}
      <div className="tz-about-masthead">
        <p className="tz-about-eyebrow">{'// '}{t('ch1Name')}</p>
        <h2 className="tz-about-title">
          {t('titlePre')} <span className="tz-gold">{t('titleHighlight')}</span>
          <span className="tz-gold">.</span>
        </h2>
        <div className="tz-about-rule" aria-hidden="true" />
      </div>

      {/* Row 1 — bleed hero */}
      <div className="tz-about-bleed">
        <div className="tz-about-bleed-text">
          <h3 className="tz-about-lead">
            {t('leadA')}
            <span className="tz-gold">{t('leadGold1')}</span>
            {t('leadB')}
            <span className="tz-gold">{t('leadGold2')}</span>
          </h3>
          {intro.map((para, i) => (
            <p key={i} className={i === 0 ? 'tz-about-lede' : 'tz-about-p'}>{para}</p>
          ))}
        </div>

        <figure className="tz-about-bleed-media rtl:rounded-r-2xl ltr:rounded-l-2xl tz-ph">
          <GallerySlot
            src={imageFor(0)}
            alt={t('img1Label')}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="tz-about-badge">{t('imgBadge')}</span>
          <figcaption className="tz-about-caption">
            <span className="tz-about-caption-kicker">{'// '}{t('imgSince')}</span>
            <span key={mainIndex} className="tz-about-caption-text tz-about-slot-enter">
              {captions[mainIndex]}
            </span>
          </figcaption>
        </figure>
      </div>

      {/* Row 2 — quote + thumbnail strip */}
      <div className="tz-about-strip">
        <div className="tz-about-strip-text">
          <blockquote className="tz-pull-quote">
            {t('pullQuote')}
            <span className="tz-pull-who">— {t('pullWho')}</span>
          </blockquote>
          <p className="tz-about-p">{t('body2')}</p>
          <p className="tz-about-p">{t('body3')}</p>
        </div>

        <div className="tz-about-frames">
          {frameLabels.map((label, slot) => {
            const imgIndex = indexFor(slot + 1);
            const info = frames[imgIndex];
            return (
              <figure key={slot} className="tz-about-frame">
                <div className="tz-about-frame-thumb tz-ph">
                  <GallerySlot src={GALLERY[imgIndex]} alt={info.title} sizes="120px" />
                </div>
                <figcaption className="tz-about-frame-info">
                  <span className="tz-about-frame-label">{label}</span>
                  <span key={imgIndex} className="tz-about-frame-text tz-about-slot-enter">
                    <span className="tz-about-frame-title">{info.title}</span>
                    <span className="tz-about-frame-caption">{info.caption}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

    </section>
  );
}
