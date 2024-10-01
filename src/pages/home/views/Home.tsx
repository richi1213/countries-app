import { lazy, Suspense } from "react";
import Loading from "~/src/components/ui/loader/Loading";

const LazyHero = lazy(() => import("@/pages/home/components/hero/Hero"));

const Home = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyHero />
    </Suspense>
  );
};

export default Home;
