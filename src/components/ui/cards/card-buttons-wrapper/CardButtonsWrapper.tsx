import {
  LikeButton,
  DeleteButton,
  DeleteButtonProps,
  LikeButtonProps,
} from "components/ui/buttons";
import styles from "components/ui/cards/card-buttons-wrapper/CardButtonsWrapper.module.css";

type CardButtonsWrapperProps = {
  likeButtonProps: LikeButtonProps;
  deleteButtonProps: DeleteButtonProps;
};

const CardButtonsWrapper = ({
  likeButtonProps,
  deleteButtonProps,
}: CardButtonsWrapperProps) => (
  <div className={styles.cardButtonsWrapper}>
    <LikeButton {...likeButtonProps} />
    <DeleteButton {...deleteButtonProps} />
  </div>
);

export default CardButtonsWrapper;
