import styles from 'components/ui/buttons/delete/DeleteButton.module.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type DeleteButtonProps = {
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  return (
    <button onClick={onDelete} className={styles.deleteButton}>
      <DeleteOutlineOutlinedIcon className={styles.delete} />
    </button>
  );
};

export default DeleteButton;
