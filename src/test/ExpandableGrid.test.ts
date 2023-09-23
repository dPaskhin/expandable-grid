import { fireEvent, render } from '@testing-library/react';
import { ExpandableGrid, IExpandableGridItemProps, IExpandableGridProps } from '../main';
import React from 'react';

describe('ExpandableGrid', () => {
  it('CheckboxWithLabel changes the text after click', () => {
    render(
      React.createElement<IExpandableGridProps>(ExpandableGrid, {
        columnsCount: 5,
        items: [() => React.createElement('div')],
        gridClassName: 'grid',
        gridItemClassName: 'item',
        parameters: {
          rowGap: 10,
          columnGap: 20,
          itemHeight: 200,
          expandedItemHeight: 400,
        },
        itemStyle: {
          color: 'red',
        },
        style: {
          background: 'grey',
        },
      })
    );
  });

  it('should render correct number of items', () => {
    const items = [
      () => React.createElement('div', {}, 'Item'),
      () => React.createElement('div', {}, 'Item'),
      () => React.createElement('div', {}, 'Item'),
    ];
    const { getAllByText } = render(React.createElement(ExpandableGrid, { items, columnsCount: 3 }));

    expect(getAllByText('Item')).toHaveLength(3);
  });

  it("should render correct grid and item's classNames", () => {
    const items = [() => React.createElement('div', {}, 'Item')];
    const { getByText } = render(
      React.createElement(ExpandableGrid, { items, columnsCount: 3, gridClassName: 'grid', gridItemClassName: 'item' })
    );

    const $item = getByText('Item').parentElement!;
    const $grid = getByText('Item').parentElement!.parentElement!;

    expect($item.classList.contains('item')).toBe(true);
    expect($grid.classList.contains('grid')).toBe(true);
  });

  it('should expand the item', () => {
    const items = [
      (({ onExpand, onClose, onToggle }) =>
        React.createElement<React.HTMLAttributes<HTMLDivElement>>(
          'div',
          {
            onClick: onExpand,
            onDoubleClick: onToggle,
            onMouseDown: onClose,
          },
          'Item'
        )) as React.FC<IExpandableGridItemProps>,
    ];
    const { getByText } = render(React.createElement(ExpandableGrid, { items, columnsCount: 4 }));

    const $item = getByText('Item');

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(75);

    fireEvent.click($item);

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(0);
  });

  it('should expand the item and close one', () => {
    const items = [
      (({ onExpand, onClose }) =>
        React.createElement<React.HTMLAttributes<HTMLDivElement>>(
          'div',
          {
            onClick: onClose,
            onDoubleClick: onExpand,
          },
          'Item'
        )) as React.FC<IExpandableGridItemProps>,
    ];
    const { getByText } = render(React.createElement(ExpandableGrid, { items, columnsCount: 2 }));

    const $item = getByText('Item');

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(50);

    fireEvent.doubleClick($item);

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(0);

    fireEvent.click($item);

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(50);
  });

  it('should toggle the item', () => {
    const items = [
      (({ onToggle }) =>
        React.createElement<React.HTMLAttributes<HTMLDivElement>>(
          'div',
          {
            onClick: onToggle,
          },
          'Item'
        )) as React.FC<IExpandableGridItemProps>,
    ];
    const { getByText } = render(React.createElement(ExpandableGrid, { items, columnsCount: 2 }));

    const $item = getByText('Item');

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(50);

    fireEvent.click($item);

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(0);

    fireEvent.click($item);

    expect(Number.parseInt($item.parentElement!.style.right)).toBe(50);
  });
});
