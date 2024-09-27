import { ReactNode } from "react";
import Snowflakes from "components/ui/animations/Snowflakes";
import Header from "components/header/Header";

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Snowflakes>
        <Header />
        {children}
      </Snowflakes>
    </>
  );
};

export default Layout;
