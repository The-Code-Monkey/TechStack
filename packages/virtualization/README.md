# react-responsive-virtual-grid

> 💀🚟 Dead-simple react virtual grid library that act like a normal `<div>`, checkout [example](https://thcolin.github.io/react-responsive-virtual-grid/)

[![NPM](https://img.shields.io/npm/v/react-responsive-virtual-grid.svg)](https://www.npmjs.com/package/react-responsive-virtual-grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-responsive-virtual-grid
# or
yarn add react-responsive-virtual-grid
```

## Features

* Responsive Grid (rows/columns)
* Virtual cells, render only when visible on the viewport
* Positioned visible cells with `position: absolute` and `transform: translate3d(x, y, 0)`
* Build with React `hooks`, don't re-render if it's not necessary
* Resize with the window
* Act like a normal `<div>` with only defined `height`

## Usage

```jsx
import React from 'react'
import VirtualGrid from 'react-responsive-virtual-grid'

const Item = ({ style, index, scrolling, readyInViewport }) => (
  <div style={{ backgroundColor: 'gainsboro', ...style }}>
    <img
      src={`https://picsum.photos/id/${index}/304/160`}
      alt={`Pcisum placeholder #${index}${scrolling ? ' - scrolling' : ''}${readyInViewport ? ' - readyInViewport' : ''}`}
      style={{ objectFit: 'cover' }}
      width='100%'
      height='100%'
      loading='lazy'
    />
  </div>
)

const App = ({ ...props }) => (
  <VirtualGrid
    total={4000}
    cell={{ height: 304, width: 160 }} // `width` is a `minWidth`, because the grid is reponsive (optional if you just want a list)
    child={Item}
    viewportRowOffset={10} // 5 on top, 5 on bottom
    onRender={children => console.log(children)} // maybe useful callback
  />
)
```

Checkout `example/src/Apps.js` for full example with `header`, `footer`, inside a `div` _container_ with `margin`

## License

MIT © [thcolin](https://github.com/thcolin)
