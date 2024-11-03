import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardButtonsWrapper,
} from 'components/ui/cards';
import { TransformedCountryData } from '@/pages/countries/components/list/types';
import { Link, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper.module.css';
import { Lang } from '@/types';

type CountryCardWrapperProps = {
  countries: TransformedCountryData[];
  handleLike: (name: string) => void;
  handleDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    countryId: string,
  ) => void;
};

const CountryCardWrapper = ({
  countries,
  handleLike,
  handleDelete,
}: CountryCardWrapperProps) => {
  const { lang = 'en' } = useParams<{ lang: Lang }>();

  return (
    <>
      {countries.map((country) => {
        if (!country || !country.name) {
          return null;
        }

        const countryName = country.name[lang] || country.name.en;
        const countryId = country.id || '';

        return (
          <div className={styles.countryItem} key={countryName}>
            <Card>
              <Link to={`${country.name.en}`} className={styles.link}>
                <CardHeader photo={country.photo} name={countryName} />
                <CardContent
                  name={countryName}
                  population={country.population}
                  capitalCity={country.capital[lang] ?? 'Unknown Capital'}
                />
                <CardFooter flag={country.flag} countryName={countryName} />
              </Link>
              <CardButtonsWrapper
                likeButtonProps={{
                  icon: <FavoriteBorderIcon />,
                  initialLikes: country.likes,
                  onLike: () => handleLike(countryName),
                }}
                deleteButtonProps={{
                  onDelete: (event) => handleDelete(event, countryId),
                }}
              />
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default CountryCardWrapper;
