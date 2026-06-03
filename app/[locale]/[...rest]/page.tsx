import {notFound} from 'next/navigation';

// Any unmatched path under a locale (e.g. /he/does-not-exist) lands here and
// triggers the locale-aware not-found UI within the layout (NavBar + Footer).
export default function CatchAllPage() {
  notFound();
}
