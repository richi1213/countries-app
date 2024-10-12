import React from "react";
import styles from "components/ui/buttons/add-country/AddCountryButton.module.css";
import AddIcon from "@mui/icons-material/Add";

type AddCountryButtonProps = {
  handleOpenModal: () => void;
};

const AddCountryButton: React.FC<AddCountryButtonProps> = ({
  handleOpenModal,
}) => {
  return (
    <button
      type="button"
      onClick={handleOpenModal}
      className={styles.addCountryButton}
    >
      Add Country
      <AddIcon />
    </button>
  );
};

export default AddCountryButton;
