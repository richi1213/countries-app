import { useEffect, useState } from "react";
import { coldCountries } from "~/src/pages/countries/utils/coldCountries";
import { fetchColdCountryData } from "~/src/pages/countries/api/countriesApi/countriesApi";
import { fetchCapitalCityPhoto } from "~/src/pages/countries/api/unsplashApi/unsplashApi";
import Loading from "~/src/components/ui/loader/Loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/src/components/ui/cards";
import { CountryData as BaseCountryData } from "~/src/pages/countries/api/countriesApi/countriesApi";
import styles from "@/pages/countries/components/list/CountryList.module.css";

type CountryData = BaseCountryData & {
  photo: string;
};

const CountryList = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = coldCountries.map(async (country) => {
          const countryData = await fetchColdCountryData(country);
          if (countryData) {
            const photoUrl = await fetchCapitalCityPhoto(countryData.capital);
            return { ...countryData, photo: photoUrl };
          }
          return null;
        });
        const results = await Promise.all(dataPromises);
        console.log("Fetched country data:", results);
        setCountriesData(
          results.filter((data): data is CountryData => data !== null)
        );
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (countriesData.length === 0) {
    return <div>No countries found.</div>;
  }

  return (
    <div className={styles.countryList}>
      {countriesData.map((country) => (
        <div className={styles.countryItem} key={country.name}>
          <Card
            renderHeader={() => (
              <CardHeader photo={country.photo} name={country.name} />
            )}
            renderContent={() => (
              <CardContent
                name={country.name}
                population={country.population}
                capitalCity={country.capital}
              />
            )}
            renderFooter={() => (
              <CardFooter flag={country.flag} countryName={country.name} />
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default CountryList;
