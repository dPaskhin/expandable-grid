# Expandable Grid
> React expandable animated adaptive grid built with css position: absolute

[![NPM Version][npm-image]][npm-url]

This component is for building grid where elements can be expanded and collapsed. 
It's just like accordion plugin, but made for grid. And if you set up this grid one column you get same accordion effect.

## Installation

NPM

```sh
npm install expandable-grid
```

YARN

```sh
yarn add expandable-grid
```

## Development setup

To build the example locally, clone the [repository](https://github.com/MiDovaah/expandable-grid) and run:

NPM

```sh
npm install
npm run start 
```

YARN

```sh
yarn install
yarn run start 
```

Then open [`localhost:8080`](http://localhost:8080) in a browser.

## Usage examples

#### Code sandbox
You can check this component on [https://codesandbox.io/](https://codesandbox.io/s/expandable-grid-9vohj)

#### Minimal usage of the component
You can use the component without any properties beside ``renderItems``, in this case grid will be set up by default properties.

```tsx
import { ExpandableGrid } from 'expandable-grid';

<ExpandableGrid
  renderItems={[
    ({ isExpanded, onExpanded, onClose }) => {
      return (
        <Item
          isExpanded={isExpanded}
          onClick={onExpanded}
          onClose={onClose}
        />
      )   
    },
    ({ isExpanded, onExpanded, onClose }) => {
      return (
        <Item
          isExpanded={isExpanded}
          onClick={onExpanded}
          onClose={onClose}
        />
      )   
    },
  ]}
/>
```

#### Usage of the component with all properties without adaptive set up
You can set transition duration of all animations for grid or grid item separately or in all. 
Add additional class name for grid or grid item.
Also you can set different dimensions of grid, e.g. item height, columns count and etc, it's not required set all of the dimensions.

```tsx
import { ExpandableGrid } from 'expandable-grid';

<ExpandableGrid
  transitionDuration={{
    grid: 500,
    item: 300,
  }}
  gridClassName='grid-class-name'
  gridItemClassName='grid-item-class-name'
  dimensions={{
    itemHeight: 100,
    columnsCount: 3,
    rowGap: 20,
    columnGap: 20,
    expandedItemHeight: 300,
  }}
  renderItems={[
    ({ isExpanded, onExpanded, onClose }) => {
      return (
        <Item
          isExpanded={isExpanded}
          onClick={onExpanded}
          onClose={onClose}
        />
      )   
    },
    ({ isExpanded, onExpanded, onClose }) => {
      return (
        <Item
          isExpanded={isExpanded}
          onClick={onExpanded}
          onClose={onClose}
        />
      )   
    }, 
  ]}
/>
```

#### Usage of the component with adaptive set up
You can set different dimensions of grid for window width range by adding array of media objects to each dimension.
If you add adaptive dimensions to the component, settings in dimensions property will be ignored.

```tsx
import { ExpandableGrid } from 'expandable-grid';

<ExpandableGrid
  transitionDuration={{
    grid: 500,
    item: 300,
  }}
  gridClassName='grid-class-name'
  gridItemClassName='grid-item-class-name'
  adaptiveDimensions={{
    itemHeight: [{ 
      windowWidth: { min: 320, max: 768 },
      value: 150,
    }, { 
      windowWidth: { min: 769, max: 1200 },
      value: 200,
    }],
    columnsCount: [{ 
      windowWidth: { min: 320, max: 768 },
      value: 3,
    }, { 
      windowWidth: { min: 769, max: 1200 },
      value: 5,
    }],
    rowGap: [{ 
      windowWidth: { min: 320, max: 768 },
      value: 20,
    }, { 
      windowWidth: { min: 769, max: 1200 },
      value: 30, 
    }],
    columnGap: [{ 
      windowWidth: { min: 320, max: 768 },
      value: 20,
    }, { 
      windowWidth: { min: 769, max: 1200 },
      value: 30, 
    }],
    expandedItemHeight: [{ 
      windowWidth: { min: 320, max: 768 },
      value: 300,
    }, { 
      windowWidth: { min: 769, max: 1200 },
      value: 350, 
    }],
  }}
  renderItems={[
    ({ isExpanded, onExpanded, onClose }) => {
      return (
        <Item
          isExpanded={isExpanded}
          onClick={onExpanded}
          onClose={onClose}
        />
      )   
    },
    ({ isExpanded, onExpanded, onClose }) => {
      return (
        <Item
          isExpanded={isExpanded}
          onClick={onExpanded}
          onClose={onClose}
        />
      )   
    },
  ]}
/>
```

## Properties

```ts
import React from 'react';

export enum EntityTypes {
  GRID = 'grid',
  ITEM = 'item',
}

// Enum with dimensions for setting of grid  
export enum DimensionsTypes {
  ITEM_HEIGHT = 'itemHeight',
  COLUMNS_COUNT = 'columnsCount',
  ROW_GAP = 'rowGap',
  COLUMN_GAP = 'columnGap',
  EXPANDED_ITEM_HEIGHT = 'expandedItemHeight',
}

// Transition duration
// Can be a number for grid and grid item together
// Or can be more detailed for grid or grid item by object with keys from EntityTypes enum
export type ITransitionDuration = number | { [K in EntityTypes]?: number };

// Object for adaptiveDimensions
export interface IMediaValue<T = number> {
  // Range of window width 
  windowWidth: { min: T; max: T };
  // Value for current window width
  value: T;
}

// Object with dimensions (described in DimensionsTypes enum) and values (number) for set up grid
export type IDimensions = {
  [K in DimensionsTypes]?: number;
}

// Object with dimensions (described in DimensionsTypes enum) and adaptive values (described in IMediaValue interface) for set up adaptive grid 
export type IAdaptiveDimensions = {
  [K in DimensionsTypes]?: IMediaValue[];
}

export interface IInjectedProps {
  // Whether the item is currently expanded
  isExpanded: boolean;
  // Handler for expand the item
  onExpand?: () => void;
  // Handler for collapse the expanded item
  onClose: () => void;
}

// Interface of main component props
export interface IProps {
  // Array of items to render in the grid
  // They should be functions which take props described in IInjectedProps interface and return JSX element  
  // This is required property
  renderItems: Array<(props: IInjectedProps) => JSX.Element>;
  // Transition duration of all animations in the component
  transitionDuration?: ITransitionDuration;
  // Additional class name for grid
  gridClassName?: string;
  // Additional class name for grid item
  gridItemClassName?: string;
  // Object with dimensions (described in DimensionsTypes enum) and values (number) for set up grid
  dimensions?: IDimensions;
  // Object with dimensions (described in DimensionsTypes enum) and adaptive values (described in IMediaValue interface) for set up adaptive grid 
  adaptiveDimensions?: IAdaptiveDimensions;
}

// This is main component to import in your react project 
export const ExpandableGrid: React.FC<IProps>;
```

#### Default values for properties are given below:

```ts
const dimensions = {
  columnsCount: 3,
  itemHeight: 150,
  expandedItemHeight: 350,
  columnGap: 20,
  rowGap: 20,
}

const props = {
  transitionDuration: undefined,
  gridClassName: '',
  gridItemClassName: '',
  dimensions: dimensions,
  adaptiveDimensions: undefined,
}
```

## Meta

Distributed under the MIT license. See ``LICENSE`` for more information.

<https://github.com/MiDovaah/expandable-grid/blob/master/LICENSE.md>

## Contributing

1. Fork it (<https://github.com/MiDovaah/expandable-grid/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/expandable-grid.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/expandable-grid
