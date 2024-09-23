import Header from "./components/header/Header";
import Snowflakes from "./components/ui/animations/Snowflakes";

const App: React.FC = () => {
  return (
    <>
      <Snowflakes>
        <Header />
      </Snowflakes>
    </>
  );
};

App.displayName = "App Component";

export default App;
