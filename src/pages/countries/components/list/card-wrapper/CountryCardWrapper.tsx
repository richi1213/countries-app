import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardButtonsWrapper,
} from "components/ui/cards";
import { CountryData } from "@/pages/countries/components/list/CountryList";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "@/pages/countries/components/list/card-wrapper/CountryCardWrapper.module.css";

type CountryCardWrapperProps = {
  countries: CountryData[];
  handleLike: (name: string) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => void;
};

const CountryCardWrapper = ({
  countries,
  handleLike,
  handleDelete,
}: CountryCardWrapperProps) => {
  return (
    <>
      {countries.map((country) => (
        <div
          className={`${styles.countryItem} ${
            country.isDeleted ? styles.deletedCountry : ""
          }`}
          key={country.name}
        >
          <Card>
            <Link to={`${country.name}`} className={styles.link}>
              <CardHeader photo={country.photo} name={country.name} />
              <CardContent
                name={country.name ?? "Unknown Name"}
                population={country.population}
                capitalCity={country.capital}
              />
              <CardFooter flag={country.flag} countryName={country.name} />
            </Link>
            <CardButtonsWrapper
              likeButtonProps={{
                icon: <FavoriteBorderIcon />,
                initialLikes: country.likes,
                onLike: () => handleLike(country.name),
              }}
              deleteButtonProps={{
                onDelete: (event) => handleDelete(event, country.name),
                isDeleted: country.isDeleted || false,
              }}
            />
          </Card>
        </div>
      ))}
    </>
  );
};

export default CountryCardWrapper;
