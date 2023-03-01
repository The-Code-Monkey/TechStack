import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/gotrue-js/src/lib/types';
import { StorageError } from '@supabase/storage-js/dist/module/lib/errors';
import { AuthError, Session, User } from '@supabase/supabase-js';

export type RecordReturnType =
  | Record<string, string>
  | Record<string, string>[]
  | Record<string, Array<Record<string, unknown>>>[];

export type AuthOptions = {
  redirectTo?: string;
  scopes?: string;
  captchaToken?: string;
  queryParams?: { [key: string]: string };
};

export type GetOptions = {
  where?: [string, string];
  columns?: string;
};

export interface DbReturnType<T extends string, F extends string> {
  get: <R extends RecordReturnType>(
    table: T,
    options?: GetOptions
  ) => Promise<dbFunctionReturnType<R>>;
  put: (
    table: T,
    data: Record<string, unknown>,
    row?: string
  ) => Promise<{ error: string }>;
  remove: (table: T, id: string) => Promise<{ error: string | undefined }>;
  signIn: (
    credentials: SignInWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<
    | { data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: AuthError }
  >;
  signUp: (
    credentials: SignUpWithPasswordCredentials,
    options?: AuthOptions
  ) => Promise<
    | { data: { user: User | null; session: Session | null }; error: null }
    | { data: { user: null; session: null }; error: AuthError }
  >;
  signOut: () => Promise<{ error: AuthError | null }>;
  dbFunction: <R extends RecordReturnType>(
    funcName: F,
    args?: Record<string, unknown>
  ) => Promise<dbFunctionReturnType<R>>;
  upload: (
    files: FileList,
    filePath: string,
    store?: string
  ) => Promise<{ url: string | null; error: StorageError | null }[]>;
}

export type dbFunctionReturnType<R extends RecordReturnType> = {
  data: R | null;
  error: string | undefined;
};
