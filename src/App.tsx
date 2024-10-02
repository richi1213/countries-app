import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "components";

import Home from "@/pages/home/views/Home";
import About from "@/pages/about/views/About";
import Countries from "@/pages/countries/views/Countries";
import NotFound from "@/pages/errors/not-found/NotFound";

import { countriesLoader } from "~/src/pages/countries/loaders/countriesLoader";
import Error from "~/src/pages/errors/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="countries"
        element={<Countries />}
        loader={countriesLoader}
        errorElement={<Error />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

App.displayName = "App Component";

export default App;
