import config from '../../orchard.theme.config.json';

import getSupabase from './supabase';

const useDB = () => {
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

export default useDB;
