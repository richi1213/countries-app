import { useParams } from 'react-router-dom';
import { BaseCountryDataDetails } from '@/api/types';
import styles from '@/pages/countries/components/country-details/CountryDetails.module.css';
import CountryHeader from '@/pages/countries/components/country-details/country-header/CountryHeader';
import GoBackButton from 'components/ui/buttons/go-back/GoBackButton';
import CountryMapLinks from '@/pages/countries/components/country-details/map-links/CountryMapLinks';
import { Lang } from '@/types';
import { translations } from '@/pages/countries/components/country-details/translations';
import { useQuery } from '@tanstack/react-query';
import { getCountryData } from '@/api/database/services';
import Loading from 'components/ui/loader/Loading';
import Error from '@/pages/errors/Error';

const CountryDetails: React.FC = () => {
  const { lang } = useParams<{ lang: Lang }>();
  const { name } = useParams<{ name: string }>();
  const translated = translations[lang ?? 'en'];

  const { data, error, isLoading } = useQuery<BaseCountryDataDetails[]>({
    queryKey: ['baseCountryDetails', name],
    queryFn: () => getCountryData(name!),
    enabled: !!name,
    gcTime: 60 * 1000,
    staleTime: 40 * 1000,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        customMessage='Failed to load country details.'
        customStatusText={error.message}
      />
    );
  }

  if (!data || data.length === 0) {
    return <p>No data found for the selected country.</p>;
  }

  const countryData = data[0];

  const countryInfoItems = [
    { label: translated.officialName, value: countryData.officialName },
    {
      label: translated.capital,
      value: countryData.capital?.[lang ?? 'en'],
    },
    { label: translated.region, value: countryData.region },
    { label: translated.subRegion, value: countryData.subregion },
    {
      label: translated.population,
      value: countryData.population?.toLocaleString(),
    },
    {
      label: translated.area,
      value: `${countryData.area?.toLocaleString()} km²`,
    },
    {
      label: translated.languages,
      value: countryData.languages?.length
        ? countryData.languages.join(', ')
        : translated.unknown,
    },
    {
      label: translated.currencies,
      value: countryData.currencies?.length
        ? countryData.currencies
            .map((currency: { name: string }) => currency.name)
            .join(', ')
        : translated.unknown,
    },
    {
      label: translated.timeZones,
      value: countryData.timezones?.join(', '),
    },
    {
      label: translated.demonyms,
      value:
        Object.values(countryData.demonyms ?? {}).join(', ') ||
        translated.unknown,
    },
    {
      label: translated.borders,
      value: countryData.borders?.length
        ? countryData.borders.join(', ')
        : translated.unknown,
    },
    {
      label: translated.drivingSide,
      value: countryData.drivingSide || translated.unknown,
    },
    { label: translated.fifaCode, value: countryData.fifaCode },
    { label: translated.startOfWeek, value: countryData.startOfWeek },
  ];

  return (
    <div className={styles.countryContainer}>
      <GoBackButton />
      <CountryHeader countryData={countryData} />
      {countryInfoItems.map((item) =>
        item.value !== undefined && item.value !== null ? (
          <p key={item.label} className={styles.countryInfo}>
            <strong>{item.label}:</strong> {item.value.toString()}
          </p>
        ) : null,
      )}
      <CountryMapLinks countryData={countryData} />
    </div>
  );
};

export default CountryDetails;
