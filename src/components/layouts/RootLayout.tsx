import Snowflakes from 'components/ui/animations/Snowflakes';
import Header from 'components/header/Header';
import { Outlet } from 'react-router-dom';
import { PageContainer } from 'components/page-container/PageContainer';
import Footer from 'components/footer/Footer';
import { Lang } from '@/types';

type RootLayoutProps = {
  onLanguageChange?: (lang: Lang) => void;
};

const RootLayout: React.FC<RootLayoutProps> = ({
  onLanguageChange,
}): JSX.Element => {
  return (
    <>
      <Snowflakes>
        <Header onLanguageChange={onLanguageChange} />
        <PageContainer>
          <Outlet />
        </PageContainer>
        <Footer />
      </Snowflakes>
    </>
  );
};

export default RootLayout;
