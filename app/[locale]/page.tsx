import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/home/HeroSection';
import {AboutSection} from '@/components/home/AboutSection';
import {NewsSection} from '@/components/home/NewsSection';
import {AcademySection} from '@/components/home/AcademySection';
import {CalendarSection} from '@/components/home/CalendarSection';
import {ContactSection} from '@/components/home/ContactSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <NewsSection />
      <AcademySection />
      <CalendarSection />
      <ContactSection />
    </>
  );
}
