export type EqualityFn<TFunc extends (...args: unknown[]) => unknown> = (
  newArgs: Parameters<TFunc>,
  lastArgs: Parameters<TFunc>
) => boolean;

export type MemoizedFn<
  TFunc extends (this: unknown, ...args: unknown[]) => unknown,
> = {
  clear: () => void;
  (
    this: ThisParameterType<TFunc>,
    ...args: Parameters<TFunc>
  ): ReturnType<TFunc>;
};

// internal type
export type Cache<
  TFunc extends (this: unknown, ...args: unknown[]) => unknown,
> = {
  lastThis: ThisParameterType<TFunc>;
  lastArgs: Parameters<TFunc>;
  lastResult: ReturnType<TFunc>;
};
