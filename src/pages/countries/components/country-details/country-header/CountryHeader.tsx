import styles from '@/pages/countries/components/country-details/country-header/CountryHeader.module.css';
import { BaseCountryDataDetails } from '@/pages/countries/api/types';
import { useParams } from 'react-router-dom';
import { Lang } from '@/types';

type CountryHeaderProps = {
  countryData: BaseCountryDataDetails;
};

const CountryHeader = ({ countryData }: CountryHeaderProps) => {
  const { lang } = useParams<{ lang: Lang }>();
  return (
    <>
      <h2 className={styles.countryTitle}>{countryData.name[lang ?? 'en']}</h2>
      <img
        className={styles.countryFlag}
        src={countryData.flag}
        alt={`Flag of ${countryData.name[lang ?? 'en']}`}
      />
    </>
  );
};

export default CountryHeader;
