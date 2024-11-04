/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REST_COUNTRIES_URL: string;
  readonly VITE_UNSPLASH_BASE_URL: string;
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
  readonly VITE_COLD_COUNTRIES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
