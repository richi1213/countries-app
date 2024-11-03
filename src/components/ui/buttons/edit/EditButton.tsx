import styles from 'components/ui/buttons/edit/EditButton.module.css';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export type EditButtonProps = {
  onEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const EditButton = ({ onEdit }: EditButtonProps) => {
  return (
    <button onClick={onEdit} className={styles.editButton}>
      <ModeEditOutlineIcon className={styles.edit} />
    </button>
  );
};

export default EditButton;
