import { Card, CardHeader, CardContent, CardFooter } from "components/ui/cards";
import { CountryData } from "@/pages/countries/components/list/CountryList";
import { Link } from "react-router-dom";
import { LikeButton } from "components/ui/buttons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "@/pages/countries/components/list/card-wrapper/CountryCardWrapper.module.css";

type CountryCardWrapperProps = {
  countries: CountryData[];
  handleLike: (name: string) => void;
};

const CountryCardWrapper = ({
  countries,
  handleLike,
}: CountryCardWrapperProps) => {
  return (
    <>
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
    </>
  );
};

export default CountryCardWrapper;
