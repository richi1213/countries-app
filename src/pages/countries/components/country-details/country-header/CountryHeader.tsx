import styles from '@/pages/countries/components/country-details/country-header/CountryHeader.module.css';
import { Country } from '@/pages/countries/components/country-details/types';

type CountryHeaderProps = {
  countryData: Country;
};

const CountryHeader = ({ countryData }: CountryHeaderProps) => {
  return (
    <>
      <h2 className={styles.countryTitle}>{countryData.name.common}</h2>
      <img
        className={styles.countryFlag}
        src={countryData.flags.png}
        alt={`Flag of ${countryData.name.common}`}
      />
    </>
  );
};

export default CountryHeader;
