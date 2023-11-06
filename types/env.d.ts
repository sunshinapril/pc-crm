interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_PUBLIC_PATH: string;
  VITE_BASE_URL: string;
  VITE_COS_PREFIX: string;
  VITE_LOGIN_URL: string;
  VITE_MAIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
