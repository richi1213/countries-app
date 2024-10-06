import { useLoaderData, useNavigate } from "react-router-dom";
import { Country } from "@/pages/countries/components/country-details/types";
import styles from "@/pages/countries/components/country-details/CountryDetails.module.css";
import CountryHeader from "~/src/pages/countries/components/country-details/country-header/CountryHeader";

const CountryDetails = () => {
  const country = useLoaderData() as Country;
  const navigate = useNavigate();

  const countryInfoItems = [
    { label: "Official Name", value: country.name.official },
    { label: "Capital", value: country.capital.join(", ") },
    { label: "Region", value: country.region },
    { label: "Subregion", value: country.subregion },
    { label: "Population", value: country.population.toLocaleString() },
    { label: "Area", value: `${country.area.toLocaleString()} km²` },
    {
      label: "Languages",
      value: Object.values(country.languages).join(", "),
    },
    {
      label: "Currencies",
      value: Object.values(country.currencies)
        .map((currency) => `${currency.name} (${currency.code})`)
        .join(", "),
    },
    { label: "Timezones", value: country.timezones.join(", ") },
    { label: "Continents", value: country.continents.join(", ") },
    {
      label: "Demonyms",
      value:
        country.demonyms &&
        Object.entries(country.demonyms).map(([lang, value]) => (
          <span key={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}: Male: {value.m},
            Female: {value.f}
          </span>
        )),
    },
    ...(country.borders && country.borders.length > 0
      ? [
          {
            label: "Borders",
            value: country.borders.join(", "),
          },
        ]
      : []),
    { label: "Driving Side", value: country.car?.side || "Unknown" },
    { label: "FIFA Code", value: country.fifa },
    { label: "Start of Week", value: country.startOfWeek },
  ];

  return (
    <div className={styles.countryContainer}>
      <button className={styles.goBackButton} onClick={() => navigate(-1)}>
        Go Back
      </button>

      <CountryHeader countryData={country} />
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
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </li>
        <li>
          <a
            href={country.maps.openStreetMaps}
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
