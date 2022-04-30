# react-lazy-named

[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

Use `React.lazy()` with named exports (or imports, if you're all opposite)

# Getting started

Install the `react-lazy-named` package with yarn or npm.

```bash
yarn add react-lazy-named

// or

npm install react-lazy-named
```

## Usage

Works just like React.lazy() but with an added argument - export name.

```jsx
import React from 'react';
import lazy from 'react-lazy-named';

const PrimaryButton = lazy(() => import('./Buttons'), 'primary');

const MyComponent = () => (
  <React.Suspense fallback={null}>
    <PrimaryButton text="YES!" />
  </React.Suspense>
);
```

### Default exports

So you want to use default exports? Sure, just don't use the second argument.

```jsx
const Card = lazy(() => import('./Card'));

// same as
const Card = lazy(() => import('./Card'), 'default');
```

### Deeply nested components

Some libraries like [framer-motion](https://www.framer.com/motion/) use deeply nested components. In other words, they export objects with components in properties. Guess what, you can reach those,too!

```jsx
const MotionDiv = lazy(() => import('framer-motion'), 'motion.div');
```

### Webpack Magic Comments

You can also use Webpack magic comments as usual.

```jsx
const PrimaryButton = lazy(
  () => import('./Buttons' /* webpackChunkName: "buttons", webpackPreload: true */),
  'primary'
);
```

## Dependencies

Your project should already be running React 16.6+ (React.lazy() required).

# Development

## Testing

This project uses Jest for unit testing. To execute tests run this command:

```sh
yarn test
```

It's useful to run tests in watch mode when developing for incremental updates.

```sh
yarn test:watch
```

# Licensing

This project is [MIT licensed](./LICENSE).
