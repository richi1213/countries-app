import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardButtonsWrapper,
} from 'components/ui/cards';
import { Link, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from '@/pages/countries/components/list/card-wrapper/CountryCardWrapper.module.css';
import { Lang } from '@/types';
import { MouseEvent } from 'react';
import { BaseCountryData } from '@/pages/countries/api/types';

type CountryCardWrapperProps = {
  countries: BaseCountryData[];
  handleLike: (id: string) => void;
  handleDelete: (
    event: MouseEvent<HTMLButtonElement>,
    countryId: string,
  ) => void;
  handleEdit: (event: MouseEvent<HTMLButtonElement>, countryId: string) => void;
};

const CountryCardWrapper = ({
  countries,
  handleLike,
  handleDelete,
  handleEdit,
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
          <div className={styles.countryItem} key={countryId}>
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
                  onLike: () => handleLike(countryId),
                }}
                editButtonProps={{
                  onEdit: (event) => handleEdit(event, countryId),
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
