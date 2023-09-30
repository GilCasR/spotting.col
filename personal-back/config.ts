import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    DB_USER: string | undefined;
    DB_PASSWORD: number | undefined;
    DB_HOST: string | undefined;
    PORT: number | undefined;
    API_KEY: string | undefined;
    AIRCRAFT_API_KEY: string | undefined;
}

interface Config {
    DB_USER: string;
    DB_PASSWORD: number;
    DB_HOST: string;
    PORT: number;
    API_KEY: string;
    AIRCRAFT_API_KEY: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD ? Number(process.env.DB_PASSWORD) : undefined,
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    API_KEY: process.env.API_KEY,
    AIRCRAFT_API_KEY: process.env.AIRCRAFT_API_KEY
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {                
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
