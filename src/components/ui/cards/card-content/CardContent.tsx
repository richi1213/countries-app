import styles from 'components/ui/cards/card-content/CardContent.module.css';
import { formatPopulation } from '@/helpers/formatPopulation';
import { useParams } from 'react-router-dom';
import { Lang } from '@/types';
import { translations } from '@/components/ui/cards/card-content/translations';

type CardContentProps = {
  name: string;
  population: number;
  capitalCity: string;
};

const CardContent = ({
  name,
  population,
  capitalCity,
}: CardContentProps): JSX.Element => {
  const { lang } = useParams<{ lang: Lang }>();

  const translated = translations[lang ?? 'en'];
  return (
    <div className={styles.cardContent}>
      <span className={styles.picTitle}>{`${capitalCity}, ${name}`}</span>
      <h3 className={styles.info}>{`${
        translated.population
      }: ${formatPopulation(population)}`}</h3>
      <h4 className={styles.info}>{`${translated.capital}: ${capitalCity}`}</h4>
    </div>
  );
};

export default CardContent;
