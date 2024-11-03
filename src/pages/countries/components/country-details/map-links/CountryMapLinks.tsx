import styles from '@/pages/countries/components/country-details/map-links/CountryMapLinks.module.css';
import { BaseCountryDataDetails } from '@/pages/countries/api/types';
import { useParams } from 'react-router-dom';

type CountryMapLinksProps = {
  countryData: BaseCountryDataDetails;
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
            href={countryData.maps.google}
            target='_blank'
            rel='noopener noreferrer'
          >
            Google Maps
          </a>
        </li>
        <li>
          <a
            href={countryData.maps.osm}
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
