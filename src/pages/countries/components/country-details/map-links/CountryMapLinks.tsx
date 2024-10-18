import styles from '@/pages/countries/components/country-details/map-links/CountryMapLinks.module.css';
import { Country } from '@/pages/countries/components/country-details/types';
import { useParams } from 'react-router-dom';

type CountryMapLinksProps = {
  countryData: Country;
};

const CountryMapLinks = ({ countryData }: CountryMapLinksProps) => {
  const { lang } = useParams();
  return (
    <>
      <p className={styles.countryInfo}>
        <strong>{lang === 'ka' ? 'რუკები: ' : 'Maps:'}</strong>
      </p>

      <ul className={styles.mapLinks}>
        <li>
          <a
            href={countryData.maps.googleMaps}
            target='_blank'
            rel='noopener noreferrer'
          >
            Google Maps
          </a>
        </li>
        <li>
          <a
            href={countryData.maps.openStreetMaps}
            target='_blank'
            rel='noopener noreferrer'
          >
            OpenStreetMap
          </a>
        </li>
      </ul>
    </>
  );
};

export default CountryMapLinks;
