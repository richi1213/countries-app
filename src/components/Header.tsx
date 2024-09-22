import winterImage from "../assets/images/winter.svg";
import hero from "../assets/images/wp.jpg";
import CountryCard from "./CountryCard";

const styles = {
  wrapper: {
    width: "100%",
    margin: "0 auto",
  },
  container: {},
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background:
      "linear-gradient(90deg, rgba(232,121,249,1) 0%, rgba(59,130,246,1) 50%, rgba(30,64,175,1) 100%)",
    color: "#17186e",
    padding: "5px 20px",
    fontFamily: '"Lucida Console", serif',
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  heroImage: {
    position: "relative" as const,
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "20px",
    paddingLeft: "20px",
  },
  heroOverlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1,
  },
  heroText: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    color: "#d4d4d4",
    textAlign: "left" as const,
    paddingLeft: "68px",
    borderRadius: "10px",
    fontWeight: "700",
    zIndex: 2,
  },
  h1: {
    fontSize: "3rem",
    lineHeight: "1.2",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#d946ef",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    textTransform: "uppercase" as const,
  },
};

export default function Header() {
  return (
    <header>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <nav style={styles.nav}>
            <div style={styles.logo}>
              <img src={winterImage} alt="winter logo" />
            </div>
            <div>🧣</div>
          </nav>
        </div>

        <div style={styles.heroImage}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroText}>
            <h1 style={styles.h1}>Jacket Weather</h1>
            <p>Find your cold place</p>
            <button style={styles.button}>Search now</button>
          </div>
          <CountryCard />
        </div>
      </div>
    </header>
  );
}
