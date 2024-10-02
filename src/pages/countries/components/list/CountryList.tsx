import { Suspense, lazy } from "react";
import { useLoaderData } from "react-router-dom";
import { CountryData as BaseCountryData } from "~/src/pages/countries/api/countriesApi/countriesApi";
import Loading from "~/src/components/ui/loader/Loading";
import styles from "@/pages/countries/components/list/CountryList.module.css";

const Card = lazy(() => import("~/src/components/ui/cards/Card"));
const CardContent = lazy(
  () => import("~/src/components/ui/cards/card-content/CardContent")
);
const CardFooter = lazy(
  () => import("~/src/components/ui/cards/card-footer/CardFooter")
);
const CardHeader = lazy(
  () => import("~/src/components/ui/cards/card-header/CardHeader")
);

type CountryData = BaseCountryData & {
  photo: string;
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
      </Suspense>
    </div>
  );
};

export default CountryList;
