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
  languageLoader,
} from '@/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to='/en' replace />} />

      <Route
        path=':lang'
        element={<RootLayout />}
        errorElement={<Error />}
        loader={languageLoader}
      >
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='countries' errorElement={<Error />}>
          <Route index element={<Countries />} loader={countriesLoader} />
          <Route
            path=':name'
            element={<CountryDetails />}
            loader={countryDetailsLoader}
          />
        </Route>
        <Route path='contact' element={<Contact />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

App.displayName = 'App Component';

export default App;
