import styles from "./SortButton.module.css";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

type SortButtonProps = {
  onSort?: () => void;
  isAscending?: boolean;
};

const SortButton = ({ onSort, isAscending }: SortButtonProps) => {
  return (
    <button onClick={onSort} className={styles.sortButton}>
      <span>Sort by Likes</span>
      <span>{isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</span>
    </button>
  );
};

export default SortButton;
