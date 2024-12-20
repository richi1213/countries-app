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
  Countries,
  Contact,
  Verification,
  NotFound,
  Error,
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
        <Route path='countries' errorElement={<Error />}>
          <Route index element={<Countries />} />
          <Route path=':name' element={<CountryDetails />} />
        </Route>
        <Route path='contact' element={<Contact />} />
        <Route path='verification' element={<Verification />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
