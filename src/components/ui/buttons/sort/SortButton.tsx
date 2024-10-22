import styles from './SortButton.module.css';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useParams } from 'react-router-dom';

type SortButtonProps = {
  onSort: () => void;
  isAscending?: boolean;
};

const SortButton = ({ onSort, isAscending }: SortButtonProps) => {
  const { lang } = useParams();
  return (
    <button onClick={onSort} className={styles.sortButton}>
      <span>{lang === 'ka' ? 'ლაიქეებით სორტირება' : 'Sort by Likes'}</span>
      <span>
        {isAscending ? (
          <ArrowUpwardIcon fontSize='small' />
        ) : (
          <ArrowDownwardIcon />
        )}
      </span>
    </button>
  );
};

export default SortButton;
