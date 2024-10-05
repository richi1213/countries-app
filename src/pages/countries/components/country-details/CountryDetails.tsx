import { useLoaderData, useNavigate } from "react-router-dom";
import { Country } from "@/pages/countries/components/country-details/types";
import styles from "@/pages/countries/components/country-details/CountryDetails.module.css";

const CountryDetails = () => {
  const country = useLoaderData() as Country[] | undefined;
  const navigate = useNavigate();

  if (!country || country.length === 0) {
    return <div>Country data not found.</div>;
  }

  const [countryData] = country; // Get the first country object

  const countryInfoItems = [
    { label: "Official Name", value: countryData.name.official },
    { label: "Capital", value: countryData.capital.join(", ") },
    { label: "Region", value: countryData.region },
    { label: "Subregion", value: countryData.subregion },
    { label: "Population", value: countryData.population.toLocaleString() },
    { label: "Area", value: `${countryData.area.toLocaleString()} km²` },
    {
      label: "Languages",
      value: Object.values(countryData.languages).join(", "),
    },
    {
      label: "Currencies",
      value: Object.values(countryData.currencies)
        .map((currency) => `${currency.name} (${currency.code})`)
        .join(", "),
    },
    { label: "Timezones", value: countryData.timezones.join(", ") },
    { label: "Continents", value: countryData.continents.join(", ") },
    {
      label: "Demonyms",
      value:
        countryData.demonyms &&
        Object.entries(countryData.demonyms).map(([lang, value]) => (
          <span key={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}: Male: {value.m},
            Female: {value.f}
          </span>
        )),
    },
    ...(countryData.borders && countryData.borders.length > 0
      ? [
          {
            label: "Borders",
            value: countryData.borders.join(", "),
          },
        ]
      : []),
    { label: "Driving Side", value: countryData.car?.side || "Unknown" },
    { label: "FIFA Code", value: countryData.fifa },
    { label: "Start of Week", value: countryData.startOfWeek },
  ];

  return (
    <div className={styles.countryContainer}>
      <button className={styles.goBackButton} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <h1 className={styles.countryTitle}>{countryData.name.common}</h1>
      <img
        className={styles.countryFlag}
        src={countryData.flags.png}
        alt={`Flag of ${countryData.name.common}`}
      />
      {countryInfoItems.map((item, index) =>
        item.value !== undefined ? (
          <p key={index} className={styles.countryInfo}>
            <strong>{item.label}:</strong> {item.value}
          </p>
        ) : null
      )}
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
    </div>
  );
};

export default CountryDetails;
