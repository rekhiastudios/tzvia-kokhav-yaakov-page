import Image from 'next/image';
import type {BodyBlock} from '@/lib/articles';

/** Converts heading text to a URL-safe anchor id, e.g. "A slow start" → "a-slow-start". */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Renders the ordered array of BodyBlock items for an article.
 * This is a server component — no client-side state required.
 */
export function ArticleBody({blocks}: {blocks: BodyBlock[]}) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className={`tz-art-p${block.dropCap ? ' drop-cap' : ''}`}>
                {block.text}
              </p>
            );

          case 'pullQuote':
            return (
              <blockquote key={i} className="tz-art-quote">
                <p className="tz-art-quote-text">{block.text}</p>
                {block.attribution && (
                  <cite className="tz-art-quote-attr">{block.attribution}</cite>
                )}
              </blockquote>
            );

          case 'image':
            return (
              <figure key={i} className={`tz-art-figure${block.wide ? ' wide' : ''}`}>
                <div className="tz-art-figure-img">
                  <Image
                    src={block.src}
                    alt={block.caption ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="tz-art-figure-cap">{block.caption}</figcaption>
                )}
              </figure>
            );

          case 'heading': {
            const id = slugify(block.text);
            if (block.level === 3) {
              return (
                <h3 key={i} id={id} className="tz-art-h3">
                  {block.text}
                </h3>
              );
            }
            return (
              <h2 key={i} id={id} className="tz-art-h2">
                {block.text}
              </h2>
            );
          }

          case 'divider':
            return (
              <div key={i} className="tz-art-divider" aria-hidden="true">
                ◆
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
