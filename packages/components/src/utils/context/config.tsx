import { createContext } from 'react';

export type Context = Record<string | 'iconDir' | 'dblClickDelay', string>;

export const ConfigContext = createContext<Context | null>(null);
