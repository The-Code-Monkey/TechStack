/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * Taken from https://github.com/component/throttle v1.0.0
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

export default function throttle(func: any, wait: any) {
  let ctx: any;
  let args: any;
  let rtn: any;
  let timeoutID: any;
  let last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date().getMilliseconds();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled(context: any) {
    ctx = context;
    // eslint-disable-next-line
    args = arguments;
    const delta = new Date().getMilliseconds() - last;
    if (!timeoutID) {
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    }
    return rtn;
  };
}
