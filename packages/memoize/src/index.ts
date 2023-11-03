import areInputsEqual from './are-inputs-equal.js';
import type { EqualityFn, MemoizedFn, Cache } from './types.js';

function index<TFunc extends (this: unknown, ...newArgs: unknown[]) => unknown>(
  resultFn: TFunc,
  isEqual: EqualityFn<TFunc> = areInputsEqual
): MemoizedFn<TFunc> {
  let cache: Cache<TFunc> | null = null;

  function memoized(
    this: ThisParameterType<TFunc>,
    ...newArgs: Parameters<TFunc>
  ): ReturnType<TFunc> | unknown {
    if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
      return cache.lastResult as ReturnType<TFunc>;
    }

    const lastResult: ReturnType<TFunc> = resultFn.apply(this, newArgs) as ReturnType<TFunc>;
    cache = {
      lastResult,
      lastArgs: newArgs,
      lastThis: this,
    };

    return lastResult as ReturnType<TFunc>;
  }

  memoized.clear = function clear() {
    cache = null;
  };

  return memoized as MemoizedFn<TFunc>;
}

export { EqualityFn, MemoizedFn };
export default index;