import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardButtonsWrapper,
} from 'components/ui/cards';
import { TranslatedCountryData } from '@/pages/countries/components/list/types';
import { Link, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper.module.css';
import { Lang } from '~/src/types';

type CountryCardWrapperProps = {
  countries: TranslatedCountryData[];
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
  const { lang = 'en' } = useParams<{ lang: Lang }>();

  return (
    <>
      {countries.map((country) => (
        <div
          className={`${styles.countryItem} ${
            country.isDeleted ? styles.deletedCountry : ''
          }`}
          key={country.name[lang] || country.name.en}
        >
          <Card>
            <Link to={`${country.name.en}`} className={styles.link}>
              <CardHeader photo={country.photo} name={country.name[lang]} />
              <CardContent
                name={country.name[lang] ?? 'Unknown Name'}
                population={country.population}
                capitalCity={country.capital[lang] ?? 'Unknown Capital'}
              />
              <CardFooter
                flag={country.flag}
                countryName={country.name[lang]}
              />
            </Link>
            <CardButtonsWrapper
              likeButtonProps={{
                icon: <FavoriteBorderIcon />,
                initialLikes: country.likes,
                onLike: () => handleLike(country.name[lang]),
              }}
              deleteButtonProps={{
                onDelete: (event) => handleDelete(event, country.name[lang]),
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
