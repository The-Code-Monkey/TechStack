export default function throttle(func, wait) {
  let ctx;
  let args;
  let rtn;
  let timeoutID;
  let last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date().getMilliseconds();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled(context) {
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
