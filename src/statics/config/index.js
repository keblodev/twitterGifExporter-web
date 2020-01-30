export const LOCAL_STORE_KEY = (process.env.LOCAL_STORE_KEY || "localStoreEntry")
  + (process.env.APP_VERSION || "dev");

export const API_URL = process.env.TWITTER_APP_API_URL || "http://localhost:3000";
export const API_TOKEN = process.env.TWITTER_APP_KINTO_TOKEN || "<some_token>";

export const APP_ENV = process.env.APP_ENV;