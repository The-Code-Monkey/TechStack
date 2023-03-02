import {ConfigContext} from "@techstack/components";
import {useContext} from "react";

import getSupabase from './supabase';

export const useDB = async () => {
  const oldConfig = useContext(ConfigContext);
  const config = await import(`${process.cwd()}/orchard.theme.config.json`)

  console.log(config, oldConfig);

  const getDB = () => {
    switch (config.dbProvider) {
      case 'supabase':
      default: {
        return getSupabase();
      }
    }
  };

  return getDB();
};
