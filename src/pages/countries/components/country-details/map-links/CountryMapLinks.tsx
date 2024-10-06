import styles from "@/pages/countries/components/country-details/map-links/CountryMapLinks.module.css";
import { Country } from "@/pages/countries/components/country-details/types";

type CountryMapLinksProps = {
  countryData: Country;
};

const CountryMapLinks = ({ countryData }: CountryMapLinksProps) => {
  return (
    <>
      <p className={styles.countryInfo}>
        <strong>Maps:</strong>
      </p>

      <ul className={styles.mapLinks}>
        <li>
          <a
            href={countryData.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </li>
        <li>
          <a
            href={countryData.maps.openStreetMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>
        </li>
      </ul>
    </>
  );
};

export default CountryMapLinks;
