import styles from 'components/ui/buttons/delete/DeleteButton.module.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';

export type DeleteButtonProps = {
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDeleted?: boolean;
};

const DeleteButton = ({ onDelete, isDeleted }: DeleteButtonProps) => {
  return (
    <button onClick={onDelete} className={styles.deleteButton}>
      {isDeleted ? (
        <RestoreFromTrashOutlinedIcon className={styles.restore} />
      ) : (
        <DeleteOutlineOutlinedIcon className={styles.delete} />
      )}
    </button>
  );
};

export default DeleteButton;
