import { ReactNode, useState } from "react";
import styles from "components/ui/buttons/like/LikeButton.module.css";

export type LikeButtonProps = {
  icon: ReactNode | JSX.Element | string;
  initialLikes?: number;
  onLike?: () => void;
};

const LikeButton = ({
  initialLikes = 0,
  icon,
  onLike,
}: LikeButtonProps): JSX.Element => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    setLikes(likes + 1);
    onLike?.();
  };

  return (
    <div className={styles.likeButton}>
      <button onClick={handleLike} className={styles.button}>
        {icon}
      </button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
