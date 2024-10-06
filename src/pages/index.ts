// pages
export { default as Home } from "@/pages/home/views/Home";
export { default as About } from "@/pages/about/views/About";
export { default as Countries } from "@/pages/countries/views/Countries";
export { default as Contact } from "@/pages/contact/views/Contact";
export { default as NotFound } from "@/pages/errors/not-found/NotFound";
export { default as Error } from "@/pages/errors/Error";
export { default as CountryDetails } from "@/pages/countries/components/country-details/CountryDetails";

// loaders
export { countriesLoader } from "@/pages/countries/loaders/countriesLoader";
export { countryDetailsLoader } from "@/pages/countries/loaders/countryDetailsLoader";

// actions
export { contactAction } from "@/pages/contact/actions/contactAction";
