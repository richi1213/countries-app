import styles from "components/ui/cards/card-header/CardHeader.module.css";
import { useEffect, useState } from "react";

type CardHeaderProps = {
  photo?: string;
  name: string;
};

const CardHeader = ({ photo, name }: CardHeaderProps): JSX.Element => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!photo) return;

    setImageLoaded(false);

    const img = new Image();
    img.src = photo;

    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageLoaded(true);
    };
  }, [photo]);

  const blurHashContent = <div className={styles.blurhash}></div>;

  return (
    <div className={styles.cardHeader}>
      {imageLoaded ? (
        <img src={photo} alt={name} loading="lazy" />
      ) : (
        blurHashContent
      )}
    </div>
  );
};

export default CardHeader;
