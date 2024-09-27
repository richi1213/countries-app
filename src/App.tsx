import { Layout, Hero } from "components";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
};

App.displayName = "App Component";

export default App;
