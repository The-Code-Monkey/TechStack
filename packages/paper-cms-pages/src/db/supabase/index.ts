import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js/src/lib/types';
import { StorageError } from '@supabase/storage-js/dist/module/lib/errors';
import { v4 as uuid } from 'uuid';

import { createBrowserClient } from '../../utils/supabase-browser';
import {
  DbReturnType,
  AuthOptions,
  dbFunctionReturnType,
  RecordReturnType,
  GetOptions,
} from '../types';

import { Database } from './database-types';

type Functions = keyof Database['public']['Functions'];

type Tables = keyof Database['public']['Tables'];

const useSupabase = (): DbReturnType<Tables, Functions> => {
  type TableType = Database['public']['Tables'][Tables]['Row'];

  const supabase = createBrowserClient();

  // Sign In
  const signIn: DbReturnType<Tables, Functions>['signIn'] = async (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return await supabase.auth.signInWithPassword({
      ...credentials,
      ...options,
    });
  };

  // Sign Up
  const signUp: DbReturnType<Tables, Functions>['signUp'] = async (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => {
    return await supabase.auth.signUp({ ...credentials, ...options });
  };

  // Sign Out
  const signOut: DbReturnType<Tables, Functions>['signOut'] = async () => {
    return await supabase.auth.signOut();
  };

  // Get
  const get: DbReturnType<Tables, Functions>['get'] = <
    R extends RecordReturnType
  >(
    table: Tables,
    options?: GetOptions
  ): Promise<dbFunctionReturnType<R>> =>
    new Promise(async resolve => {
      const { columns, where } = options ?? {};

      const result = await supabase
        .from<Tables, TableType>(table)
        .select(columns ?? '*')
        .eq(...(where ?? ['', '']));

      const data = result.data as R | null;
      const error = result.error;

      resolve({ data, error: error?.message });
    });

  // Put
  const put: DbReturnType<Tables, Functions>['put'] = (
    table: Tables,
    data: Record<string, unknown>,
    row?: string
  ) =>
    new Promise(async resolve => {
      let error;

      if (row) {
        if (data.id) {
          delete data.id;
        }
        const res = await supabase
          .from(table)
          .update(data)
          .eq('id', parseInt(row, 10));

        error = res.error;
      } else {
        const res = await supabase.from(table).insert(data);
        error = res.error;
      }

      resolve({ error } as unknown as { error: string });
    });

  // Delete
  const remove: DbReturnType<Tables, Functions>['remove'] = (
    table: Tables,
    id: string
  ) =>
    new Promise(async resolve => {
      const { error } = await supabase.from(table).delete().eq('id', id);

      resolve({ error: error?.message });
    });

  // Function
  const dbFunction: DbReturnType<Tables, Functions>['dbFunction'] = <
    R extends RecordReturnType
  >(
    funcName: Functions,
    args?: Record<string, unknown>
  ): Promise<dbFunctionReturnType<R>> =>
    new Promise(async resolve => {
      const result = await supabase.rpc(funcName, args);

      const data = result.data as R | null;
      const error = result.error;

      resolve({ data, error: error?.message });
    });

  // Upload
  const upload: DbReturnType<Tables, Functions>['upload'] = async (
    files,
    filePath,
    store = 'images'
  ) =>
    Promise.all<{ url: string | null; error: StorageError | null }>(
      Array.from(files).map(
        file =>
          new Promise(async resolve => {
            const { data: uploadData, error: uploadError } =
              await supabase.storage
                .from(store)
                .upload(`${filePath}/${uuid()}`, file);

            if (uploadData?.path) {
              const { data } = supabase.storage
                .from(store)
                .getPublicUrl(uploadData.path);

              resolve({ url: data?.publicUrl, error: null });
            }

            resolve({ error: uploadError as StorageError, url: null });
          })
      )
    );

  return { signIn, signUp, signOut, get, put, remove, dbFunction, upload };
};

export default useSupabase;
