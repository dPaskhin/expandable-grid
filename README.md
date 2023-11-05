# Expandable Grid

React grid component with expandable items and adaptive functionality, crafted using position: absolute CSS.

[![NPM Version][npm-image]][npm-url]

The grid expandable component is an interactive layout tool designed to create grids with expandable and collapsible
elements. This dynamic component allows users to reveal or hide content within the grid, enhancing the user experience
by accommodating detailed information without overwhelming the interface. It functions similarly to an accordion
mechanism, adapted for grid usage. When configured as a single-column grid, it transforms into a classic accordion,
offering a familiar experience with a versatile twist.

## Installation

```shell
npm i --save expandable-grid
```

or

```shell
yarn add expandable-grid
```

## Examples

### Locale

To build the example locally, clone the [repository](https://github.com/dPaskhin/expandable-grid) and run:

```sh
npm install
npm run build

cd example

npm install
npm run watch
```

Then open [`localhost:1234`](http://localhost:1234) in a browser.

### Code sandbox

You can check this component on [https://codesandbox.io/](https://codesandbox.io/p/github/dPaskhin/expandable-grid/master)

## Base usage of the component

To quickly integrate the grid into your application, the only required properties are items and columns' count. When
instantiated
without any additional properties, the component defaults to a pre-configured grid setup.

```tsx
import { ExpandableGrid, IExpandableGridItemProps } from 'expandable-grid';
import { FC } from 'react';

<ExpandableGrid
  items={[Item, Item, Item, Item]}
  columnsCount={3}
/>;

const Item: FC<IExpandableGridItemProps> = ({ onToggle, isExpanded, onClose, onExpand, index }) => {
  return <div></div>;
};
```

### Customization with class names and styles

You can enhance the visual presentation by applying custom classNames and inline styles to the grid elements.

```tsx
import { ExpandableGrid, IExpandableGridItemProps } from 'expandable-grid';
import { FC } from 'react';

<ExpandableGrid
  items={[Item, Item, Item, Item]}
  columnsCount={3}
  gridClassName={'grid-class-name'}
  gridItemClassName={'grid-item-class-name'}
  gridExpandedItemClassName={'grid-expanded-item-class-name'}
  style={{ transitionDuration: '100ms' }}
  itemStyle={{ transitionDuration: '200ms' }}
/>;

const Item: FC<IExpandableGridItemProps> = ({ onToggle, isExpanded, onClose, onExpand, index }) => {
  return <div></div>;
};
```

#### Parameter customization and responsive settings

You can define key parameters to control the spacing and sizing of the grid and its elements.

```tsx
import { ExpandableGrid, IExpandableGridItemProps } from 'expandable-grid';
import { FC } from 'react';

// Constants parameters
<ExpandableGrid
  items={[Item, Item, Item, Item]}
  columnsCount={3}
  parameters={{
    rowGap: 10,
    columnGap: 10,
    itemHeight: 100,
    expandedItemHeight: 150,
  }}
/>;

// Adaptive variants
// The key for each parameter corresponds to the window width, 
// and the value determines the parameter that will be applied at that specific width
<ExpandableGrid
  items={[Item, Item, Item, Item]}
  columnsCount={{ 320: 1, 768: 3, 1200: 6 }}
  parameters={{
    rowGap: { 320: 10, 768: 12, 1200: 16 },
    columnGap: { 320: 10, 768: 12, 1200: 16 },
    itemHeight: { 320: 100, 768: 150, 1200: 200 },
    expandedItemHeight: { 320: 150, 768: 200, 1200: 300 },
  }}
/>;

const Item: FC<IExpandableGridItemProps> = ({ onToggle, isExpanded, onClose, onExpand, index }) => {
  return <div></div>;
};
```

#### Default values for parameters are given below:

```ts
const DEFAULT_PARAMETERS = {
  rowGap: 20,
  columnGap: 20,
  itemHeight: 150,
  expandedItemHeight: 350,
};
```

## Meta

Distributed under the MIT license. See `LICENSE` for more information.

<https://github.com/dPaskhin/expandable-grid/blob/master/LICENSE.md>

## Contributing

1. Fork it (<https://github.com/dPaskhin/expandable-grid/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'feat: add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

[npm-image]: https://img.shields.io/npm/v/expandable-grid.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/expandable-grid
