import { useLoaderData, useParams } from 'react-router-dom';
import { Country } from '@/pages/countries/components/country-details/types';
import styles from '@/pages/countries/components/country-details/CountryDetails.module.css';
import CountryHeader from '@/pages/countries/components/country-details/country-header/CountryHeader';
import GoBackButton from 'components/ui/buttons/go-back/GoBackButton';
import CountryMapLinks from '@/pages/countries/components/country-details/map-links/CountryMapLinks';
import { Lang } from '@/types';
import { translations } from '@/pages/countries/components/country-details/translations';

const CountryDetails = () => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];

  const country = useLoaderData() as Country;

  if (!country) {
    return <div>Country data not found.</div>;
  }

  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    timezones,
    continents,
    demonyms,
    borders,
    car,
    fifa,
    startOfWeek,
  } = country;

  const countryInfoItems = [
    { label: translated.officialName, value: name.official },
    { label: translated.capital, value: capital.join(', ') },
    { label: translated.region, value: region },
    { label: translated.subRegion, value: subregion },
    { label: translated.population, value: population.toLocaleString() },
    { label: translated.area, value: `${area.toLocaleString()} km²` },
    {
      label: translated.languages,
      value: Object.values(languages).join(', '),
    },
    {
      label: translated.currencies,
      value: Object.values(currencies)
        .map((currency) => `${currency.name} (${currency.code})`)
        .join(', '),
    },
    { label: translated.timeZones, value: timezones.join(', ') },
    { label: translated.continents, value: continents.join(', ') },
    {
      label: translated.demonyms,
      value: Object.entries(demonyms || {}).map(([lang, value]) => (
        <span key={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}: Male: {value.m},
          Female: {value.f}
        </span>
      )),
    },
    ...(borders && borders.length > 0
      ? [{ label: translated.borders, value: borders.join(', ') }]
      : []),
    { label: translated.drivingSide, value: car?.side || translated.unknown },
    { label: translated.fifaCode, value: fifa },
    { label: translated.startOfWeek, value: startOfWeek },
  ];

  return (
    <div className={styles.countryContainer}>
      <GoBackButton />
      <CountryHeader countryData={country} />
      {countryInfoItems.map((item) =>
        item.value !== undefined ? (
          <p key={item.label} className={styles.countryInfo}>
            <strong>{item.label}:</strong> {item.value}
          </p>
        ) : null
      )}
      <CountryMapLinks countryData={country} />
    </div>
  );
};

export default CountryDetails;
