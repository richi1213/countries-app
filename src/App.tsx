import React, { useState } from 'react';
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
import { Lang } from '@/types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Lang>('en');

  const handleLanguageChange = (newLang: Lang) => {
    setLanguage(newLang);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navigate to={`/${language}`} replace />} />

        <Route
          path='/:lang'
          element={<RootLayout onLanguageChange={handleLanguageChange} />}
        >
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
