import Snowflakes from "components/ui/animations/Snowflakes";
import Header from "components/header/Header";
import { Outlet } from "react-router-dom";
import { PageContainer } from "components/page-container/PageContainer";

const RootLayout = (): JSX.Element => {
  return (
    <>
      <Snowflakes>
        <Header />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Snowflakes>
    </>
  );
};

export default RootLayout;
