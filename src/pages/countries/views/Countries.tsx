import { lazy, Suspense } from "react";
import Loading from "~/src/components/ui/loader/Loading";

const LazyCountryList = lazy(
  () => import("~/src/pages/countries/components/list/CountryList")
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
