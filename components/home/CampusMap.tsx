'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useLocale } from 'next-intl';

const LAT = 31.882419;
const LNG = 35.240107;
const GMAPS = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

const PIN = divIcon({
  html: '<div class="tz-pin"><div class="tz-pin-pulse"></div></div>',
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

type CampusMapProps = {
  /** Show the floating info card overlay (school name + coords + directions CTA). */
  showCard?: boolean;
  /** Extra class applied to the map wrapper so callers can override sizing/border. */
  className?: string;
};

export default function CampusMap({showCard = true, className}: CampusMapProps) {
  const locale = useLocale();
  const isHe = locale === 'he';

  return (
    <div className={`tz-map-wrap${className ? ` ${className}` : ''}`}>
      <MapContainer
        center={[LAT, LNG]}
        zoom={16}
        scrollWheelZoom={false}
        zoomControl={false}
        className="tz-leaflet"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />
        <ZoomControl position="topright" />
        <Marker position={[LAT, LNG]} icon={PIN} />
      </MapContainer>

      {/* Floating card — bottom of the map */}
      {showCard && (
        <div className="tz-map-card">
          <div className="tz-map-card-body">
            <p className="tz-map-card-name">
              {isHe ? 'אולפנת צביה כוכב יעקב' : "Ulpenat Tzvia Kokhav Ya'akov"}
            </p>
            <p className="tz-map-card-coords">31.8824° N · 35.2401° E</p>
          </div>
          <a
            href={GMAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="tz-map-card-cta"
          >
            {isHe ? 'נווט אלינו' : 'Directions'} <span className="arr">→</span>
          </a>
        </div>
      )}
    </div>
  );
}
