import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import styles from "components/ui/modals/AddCountryModal.module.css";
import { CountryData } from "@/pages/countries/components/list/CountryList";
import { capitalizeWords } from "@/helpers/capitalizeWords";

type AddCountryModalProps = {
  open: boolean;
  handleClose: () => void;
  handleAddCountry: (newCountry: CountryData) => void;
  existingCountries: CountryData[];
};

const AddCountryModal: React.FC<AddCountryModalProps> = ({
  open,
  handleClose,
  handleAddCountry,
  existingCountries,
}) => {
  const [formData, setFormData] = useState({
    countryName: "",
    capital: "",
    population: null as number | null,
    photoUrl: "",
    flagUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "population" && value === "" ? null : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isCountryAlreadyAdded = existingCountries.some(
      (country) =>
        country.name.toLowerCase() === formData.countryName.toLowerCase()
    );

    if (isCountryAlreadyAdded) {
      alert("This country is already added.");
      return;
    }

    // Validate population
    if (formData.population === null || formData.population <= 0) {
      alert("Please enter a valid population greater than zero.");
      return;
    }

    const newCountry: CountryData = {
      name: capitalizeWords(formData.countryName),
      capital: capitalizeWords(formData.capital),
      population: formData.population,
      photo: formData.photoUrl,
      flag: formData.flagUrl,
      likes: 0,
      isDeleted: false,
    };

    handleAddCountry(newCountry);

    // Clear form fields after submission
    setFormData({
      countryName: "",
      capital: "",
      population: null,
      photoUrl: "",
      flagUrl: "",
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalContent}>
        <h2 className={styles.textField}>Add a New Country</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            className={styles.textField}
            label="Country Name"
            name="countryName"
            value={formData.countryName}
            onChange={handleChange}
            fullWidth
            required
            aria-label="Country Name"
          />
          <TextField
            className={styles.textField}
            label="Capital"
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            fullWidth
            required
            aria-label="Capital"
          />
          <TextField
            className={styles.textField}
            label="Population"
            type="number"
            name="population"
            value={formData.population ?? ""}
            onChange={handleChange}
            fullWidth
            required
            aria-label="Population"
          />
          <TextField
            className={styles.textField}
            label="Photo URL (of Capital)"
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            fullWidth
            required
            aria-label="Photo URL (of Capital)"
          />
          <TextField
            className={styles.textField}
            label="Flag URL"
            name="flagUrl"
            value={formData.flagUrl}
            onChange={handleChange}
            fullWidth
            aria-label="Flag URL"
          />
          <div className={styles.buttonGroup}>
            <Button type="submit" variant="contained" color="primary">
              Add Country
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCountryModal;
