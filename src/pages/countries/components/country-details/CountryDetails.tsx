import { useLoaderData, useParams } from 'react-router-dom';
import { BaseCountryDataDetails } from '@/pages/countries/api/types';
import styles from '@/pages/countries/components/country-details/CountryDetails.module.css';
import CountryHeader from '@/pages/countries/components/country-details/country-header/CountryHeader';
import GoBackButton from 'components/ui/buttons/go-back/GoBackButton';
import CountryMapLinks from '@/pages/countries/components/country-details/map-links/CountryMapLinks';
import { Lang } from '@/types';
import { translations } from '@/pages/countries/components/country-details/translations';

const CountryDetails: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();
  const translated = translations[lang ?? 'en'];

  const country = useLoaderData() as BaseCountryDataDetails;

  if (!country) {
    return <div>Country data not found.</div>;
  }

  const {
    officialName,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    timezones,
    demonyms,
    borders,
    drivingSide,
    fifaCode,
    startOfWeek,
  } = country;

  // Map of country information items
  const countryInfoItems = [
    { label: translated.officialName, value: officialName },
    { label: translated.capital, value: capital[lang ?? 'en'] },
    { label: translated.region, value: region },
    { label: translated.subRegion, value: subregion },
    { label: translated.population, value: population.toLocaleString() },
    { label: translated.area, value: `${area.toLocaleString()} km²` },
    {
      label: translated.languages,
      value: languages
        ? languages.map((language) => language).join(', ')
        : translated.unknown,
    },
    {
      label: translated.currencies,
      value: currencies.length
        ? currencies.map((currency) => currency.name).join(', ')
        : translated.unknown,
    },
    { label: translated.timeZones, value: timezones.join(', ') },
    {
      label: translated.demonyms,
      value: Object.values(demonyms).map((value) => {
        return value;
      }),
    },

    {
      label: translated.borders,
      value: borders
        ? borders.map((border) => border).join(', ')
        : translated.unknown,
    },

    { label: translated.drivingSide, value: drivingSide || translated.unknown },
    { label: translated.fifaCode, value: fifaCode },
    { label: translated.startOfWeek, value: startOfWeek },
  ];

  return (
    <div className={styles.countryContainer}>
      <GoBackButton />
      <CountryHeader countryData={country} />
      {countryInfoItems.map((item) =>
        item.value !== undefined ? (
          <p key={item.label} className={styles.countryInfo}>
            <strong>{item.label}:</strong> {item.value.toString()}
          </p>
        ) : null,
      )}
      <CountryMapLinks countryData={country} />
    </div>
  );
};

export default CountryDetails;
