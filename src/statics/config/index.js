export const LOCAL_STORE_KEY = (process.env.LOCAL_STORE_KEY || "localStoreEntry")
  + (process.env.APP_VERSION || "dev");

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const APP_ENV = process.env.APP_ENV;