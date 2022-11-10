// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
const noop = (a: unknown) => {};

const whilst = (
  test: () => boolean,
  iterator?: (
    a: (b?: unknown, err?: unknown, ...args: unknown[]) => void
  ) => void,
  callback = noop
) => {
  if (test()) {
    iterator(function next(a: unknown, err: unknown, ...args: unknown[]) {
      if (err) {
        callback(err);
      } else if (test.apply(a, args)) {
        iterator(next);
      } else {
        callback(null);
      }
    });
  } else {
    callback(null);
  }
};

export default whilst;
