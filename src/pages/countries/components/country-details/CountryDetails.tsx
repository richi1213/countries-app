import { useLoaderData } from "react-router-dom";
import { Country } from "@/pages/countries/components/country-details/types";
import styles from "@/pages/countries/components/country-details/CountryDetails.module.css";
import CountryHeader from "@/pages/countries/components/country-details/country-header/CountryHeader";
import GoBackButton from "components/ui/buttons/go-back/GoBackButton";
import CountryMapLinks from "@/pages/countries/components/country-details/map-links/CountryMapLinks";

const CountryDetails = () => {
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
    { label: "Official Name", value: name.official },
    { label: "Capital", value: capital.join(", ") },
    { label: "Region", value: region },
    { label: "Subregion", value: subregion },
    { label: "Population", value: population.toLocaleString() },
    { label: "Area", value: `${area.toLocaleString()} km²` },
    {
      label: "Languages",
      value: Object.values(languages).join(", "),
    },
    {
      label: "Currencies",
      value: Object.values(currencies)
        .map((currency) => `${currency.name} (${currency.code})`)
        .join(", "),
    },
    { label: "Timezones", value: timezones.join(", ") },
    { label: "Continents", value: continents.join(", ") },
    {
      label: "Demonyms",
      value: Object.entries(demonyms || {}).map(([lang, value]) => (
        <span key={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}: Male: {value.m},
          Female: {value.f}
        </span>
      )),
    },
    ...(borders && borders.length > 0
      ? [{ label: "Borders", value: borders.join(", ") }]
      : []),
    { label: "Driving Side", value: car?.side || "Unknown" },
    { label: "FIFA Code", value: fifa },
    { label: "Start of Week", value: startOfWeek },
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
