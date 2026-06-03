import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';

interface FooterLink {
  label: string;
  href: string;
}

export function Footer() {
  const t = useTranslations('footer');
  const schoolLinks = t.raw('colSchoolLinks') as FooterLink[];
  const admissionsLinks = t.raw('colAdmissionsLinks') as FooterLink[];
  const resourcesLinks = t.raw('colResourcesLinks') as FooterLink[];
  const socials = t.raw('socials') as string[];

  return (
    <footer className="tz-footer">
        <div className="tz-footer-top">
          {/* Brand column */}
          <div className="tz-footer-brand">
            <div className="tz-footer-logo">
              {/* <div className="tz-footer-mark">צ</div> */}
              <Image
                src="/NoamTzviaLogo.PNG"
                alt="Ulpenat Tzvia Kochav Yaakov"
                width={1024}
                height={794}
                className="h-20 w-auto object-contain"
              />
              <div className="tz-footer-name">
                {t('brandName1')} <br/> {t('brandName2')}
                <small>{t('brandSub')}</small>
              </div>
            </div>
            <p>{t('brandDesc')}</p>
          </div>

          {/* Link columns */}
          <div className="tz-footer-col">
            <h5>{t('colSchool')}</h5>
            <ul>
              {schoolLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    {link.label} <span className="arr">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="tz-footer-col">
            <h5>{t('colAdmissions')}</h5>
            <ul>
              {admissionsLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    {link.label} <span className="arr">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="tz-footer-col">
            <h5>{t('colResources')}</h5>
            <ul>
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    {link.label} <span className="arr">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + socials */}
          <div className="tz-newsletter-box">
            <h5>{t('newsletter')}</h5>
            <p className="tz-nl-hint">{t('newsletterHint')}</p>
            <div className="tz-nl-form">
              <input placeholder={t('newsletterPlaceholder')} type="email" />
              <button type="button">→</button>
            </div>
            <div className="tz-socials">
              {socials.map((s) => (
                <button key={s} type="button" className="tz-social">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Bottom bar */}
        <div
          className="tz-footer-bottom"
          style={{marginTop: 22, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.12)'}}
        >
          <div className="left">
            <span>{t('copyright')}</span>
            <span>{t('build')}</span>
          </div>
          <div className="right">
            <Link href="/coming-soon">{t('privacy')}</Link>
            <Link href="/coming-soon">{t('accessibility')}</Link>
            <Link href="/coming-soon">{t('sitemap')}</Link>
          </div>
        </div>
    </footer>
  );
}
