import { createContext } from 'react';

export type Context = Record<string | 'iconDir', string>;

export const ConfigContext = createContext<Context | null>(null);
