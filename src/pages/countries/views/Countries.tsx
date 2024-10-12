import Loading from "components/ui/loader/Loading";
import { lazy, Suspense } from "react";

const LazyCountryList = lazy(
  () => import("@/pages/countries/components/list/CountryList")
);

const Countries = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <LazyCountryList />
      </Suspense>
    </>
  );
};

export default Countries;
