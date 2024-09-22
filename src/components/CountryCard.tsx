import OsloImg from "../assets/images/oslo.jpg";
import NorwayFlag from "../assets/images/norway-flag.bmp";
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  card: {
    position: "relative",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    backgroundColor: "rgba(224, 242, 254, 0.75)",
    height: "20rem",
    transition: "box-shadow 300ms, background-color 300ms",
    width: "100%",
    maxWidth: "20rem",
    zIndex: 2,
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  imageWrapper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "0.375rem 0.375rem 0 0",
    height: "10rem",
    width: "100%",
    transition: "transform 300ms",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "fill",
    transition: "transform 300ms",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "1.25rem",
    padding: "1rem",
  },
  picTitle: {
    color: "#1e3a8a",
    fontSize: "0.875rem",
    fontWeight: "bold",
  },
  info: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    lineHeight: "1.75rem",
  },
  logoWrapper: {
    position: "absolute",
    width: "78px",
    height: "56px",
    right: "0px",
    top: "20px",
  },
  logo: {
    borderRadius: "50%",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
};

export default function CountryCard() {
  const country = {
    name: "Norway",
    population: "5.46 million",
    capitalCity: "Oslo",
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardInner}>
        <div style={styles.imageWrapper}>
          <img src={OsloImg} alt="Norway" style={styles.image} />
        </div>
        <div style={styles.content}>
          <span style={styles.picTitle}>
            {`${country.capitalCity}, ${country.name}`}
          </span>
          <h3
            style={styles.info}
          >{`Population: ${country.population.toUpperCase()}`}</h3>
          <h4
            style={styles.info}
          >{`Capital city: ${country.capitalCity.toUpperCase()}`}</h4>
        </div>
      </div>
      <div style={styles.logoWrapper}>
        <img src={NorwayFlag} alt="Norway flag" style={styles.logo} />
      </div>
    </div>
  );
}
