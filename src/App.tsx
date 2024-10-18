import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { RootLayout } from 'components';
import {
  Home,
  About,
  Countries,
  Contact,
  NotFound,
  Error,
  countriesLoader,
  countryDetailsLoader,
  CountryDetails,
  contactAction,
} from '@/pages';

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navigate to={`/en`} replace />} />

        <Route path='/:lang' element={<RootLayout />}>
          <Route index element={<Home />} errorElement={<Error />} />
          <Route path='about' element={<About />} errorElement={<Error />} />
          <Route path='countries' errorElement={<Error />}>
            <Route index element={<Countries />} loader={countriesLoader} />
            <Route
              path=':name'
              element={<CountryDetails />}
              loader={countryDetailsLoader}
            />
          </Route>
          <Route
            path='contact'
            element={<Contact />}
            action={contactAction}
            errorElement={<Error />}
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

App.displayName = 'App Component';

export default App;
