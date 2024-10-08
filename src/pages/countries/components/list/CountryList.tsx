import { Suspense, lazy, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { CountryData as BaseCountryData } from "@/pages/countries/api/countriesApi/countriesApi";
import Loading from "components/ui/loader/Loading";
import styles from "@/pages/countries/components/list/CountryList.module.css";
import CardHeader from "components/ui/cards/card-header/CardHeader";
import CardContent from "components/ui/cards/card-content/CardContent";
import CardFooter from "components/ui/cards/card-footer/CardFooter";
import LikeButton from "components/ui/buttons/like/LikeButton";
import SortButton from "components/ui/buttons/sort/SortButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Card = lazy(() => import("components/ui/cards/Card"));

type CountryData = BaseCountryData & {
  photo?: string;
  likes: number;
};

const CountryList = () => {
  const countriesData = useLoaderData() as CountryData[];

  // Initialize state with fetched countries and their likes
  const [countries, setCountries] = useState<CountryData[]>(
    countriesData.map((country) => ({
      ...country,
      likes: country.likes || 0,
    }))
  );

  // State for sorting order (ascending or descending)
  const [isAscending, setIsAscending] = useState<boolean>(true);

  // Function to handle when the like button is clicked
  const handleLike = (name: string) => {
    setCountries((prevCountries) =>
      prevCountries.map((country) =>
        country.name === name
          ? { ...country, likes: country.likes + 1 }
          : country
      )
    );
  };

  // Function to toggle sorting by likes
  const sortCountries = () => {
    setIsAscending((prev) => !prev);
    setCountries((prevCountries) =>
      [...prevCountries].sort((a, b) =>
        isAscending ? b.likes - a.likes : a.likes - b.likes
      )
    );
  };

  return (
    <div className={styles.countryList}>
      <SortButton onSort={sortCountries} isAscending={isAscending} />
      <Suspense fallback={<Loading />}>
        {countries.map((country) => (
          <div className={styles.countryItem} key={country.name}>
            <Card>
              <Link to={`${country.name}`} className={styles.link}>
                <CardHeader photo={country.photo} name={country.name} />
                <CardContent
                  name={country.name ?? "Unknown Name"}
                  population={country.population}
                  capitalCity={country.capital}
                />
              </Link>
              <CardFooter flag={country.flag} countryName={country.name} />
              <LikeButton
                icon={<FavoriteBorderIcon />}
                initialLikes={country.likes}
                onLike={() => handleLike(country.name)}
              />
            </Card>
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default CountryList;
