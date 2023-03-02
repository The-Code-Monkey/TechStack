import { ConfigContext } from '@techstack/components';
import { useContext } from 'react';

import getSupabase from './supabase';

export const useDB = () => {
  const config = useContext(ConfigContext);

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
