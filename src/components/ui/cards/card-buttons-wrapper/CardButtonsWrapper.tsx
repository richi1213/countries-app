import {
  LikeButton,
  DeleteButton,
  DeleteButtonProps,
  EditButtonProps,
  LikeButtonProps,
  EditButton,
} from 'components/ui/buttons';
import styles from 'components/ui/cards/card-buttons-wrapper/CardButtonsWrapper.module.css';

type CardButtonsWrapperProps = {
  likeButtonProps: LikeButtonProps;
  deleteButtonProps: DeleteButtonProps;
  editButtonProps: EditButtonProps;
};

const CardButtonsWrapper = ({
  likeButtonProps,
  deleteButtonProps,
  editButtonProps,
}: CardButtonsWrapperProps) => (
  <div className={styles.cardButtonsWrapper}>
    <LikeButton {...likeButtonProps} />
    <div className={styles.editDeleteWrapper}>
      <EditButton {...editButtonProps} />
      <DeleteButton {...deleteButtonProps} />
    </div>
  </div>
);

export default CardButtonsWrapper;
