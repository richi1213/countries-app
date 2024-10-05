import { Suspense, lazy } from "react";
import { useLoaderData, Link } from "react-router-dom"; // Import Link from react-router-dom
import { CountryData as BaseCountryData } from "@/pages/countries/api/countriesApi/countriesApi";
import Loading from "components/ui/loader/Loading";
import styles from "@/pages/countries/components/list/CountryList.module.css";
import CardHeader from "components/ui/cards/card-header/CardHeader";
import CardContent from "components/ui/cards/card-content/CardContent";
import CardFooter from "components/ui/cards/card-footer/CardFooter";

const Card = lazy(() => import("components/ui/cards/Card"));

type CountryData = BaseCountryData & {
  photo?: string;
};

const CountryList = () => {
  const countriesData = useLoaderData() as CountryData[];

  if (countriesData.length === 0) {
    return <div>No countries found.</div>;
  }

  return (
    <div className={styles.countryList}>
      <Suspense fallback={<Loading />}>
        {countriesData.map((country) => (
          <div className={styles.countryItem} key={country.name}>
            <Link to={`${country.name}`} className={styles.link}>
              <Card
                renderHeader={() => (
                  <CardHeader photo={country.photo} name={country.name} />
                )}
                renderContent={() => (
                  <CardContent
                    name={country.name ?? "Unknown Name"}
                    population={country.population}
                    capitalCity={country.capital}
                  />
                )}
                renderFooter={() => (
                  <CardFooter flag={country.flag} countryName={country.name} />
                )}
              />
            </Link>
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default CountryList;
