import React, { useEffect } from 'react';

import '@lib/style/expandable.css';
import { IProps } from '@lib/interfaces/IProps';
import { GridClassnames } from '@lib/enums/GridClassnames';
import { getGridItemClass } from '@lib/utils/getGridItemClass';
import { useDimensions } from '@lib/hooks/useDimensions';
import { useWindowWidth } from '@lib/hooks/useWindowWidth';
import { useGridItems } from '@lib/hooks/useGridItems';
import { useGridHeight } from '@lib/hooks/useGridHeght';
import { useGridStyles } from '@lib/hooks/useGridStyles';
import { useGridItemStylesGetter } from '@lib/hooks/useGridItemStylesGetter';
import { useExpandedItem } from '@lib/hooks/useExpandedItem';

export const ExpandableGrid: React.FC<IProps> = ({
  renderItems,
  dimensions,
  adaptiveDimensions,
  transitionDuration = 200,
  gridClassName = '',
  gridItemClassName = '',
}) => {
  const windowWidth = useWindowWidth(!!adaptiveDimensions);

  const {
    itemHeight,
    columnsCount,
    rowGap,
    columnGap,
    expandedItemHeight,
  } = useDimensions(windowWidth, dimensions, adaptiveDimensions);

  const [expandedItem, setExpandedItem] = useExpandedItem();

  const items = useGridItems({
    itemsCount: renderItems.length,
    columnsCount,
    expandedItem,
  });

  useEffect(() => () => setExpandedItem(null), [columnsCount]);

  const gridHeight = useGridHeight({
    itemHeight,
    columnsCount,
    diffHeight: expandedItemHeight - itemHeight,
    itemsCount: items.length,
    expandedItem,
  });

  const gridStyles = useGridStyles({
    rowGap,
    columnGap,
    transitionDuration,
    gridHeight,
  });

  const getGridItemStyles = useGridItemStylesGetter({
    itemHeight,
    columnsCount,
    transitionDuration,
    diffHeight: expandedItemHeight - itemHeight,
    rowGap,
    columnGap,
    expandedItemHeight,
  });

  return (
    <div
      className={`${GridClassnames.GRID_CLASSNAME} ${gridClassName}`}
      style={gridStyles}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={getGridItemClass({
            isExpanded: expandedItem === index,
            extraClass: gridItemClassName,
          })}
          style={getGridItemStyles(item, index === expandedItem)}
        >
          {renderItems[index]({
            isExpanded: expandedItem === index,
            onExpand: expandedItem !== index
              ? () => setExpandedItem(index)
              : undefined,
            onClose: event => {
              event.stopPropagation();
              setExpandedItem(null);
            },
          })}
        </div>
      ))}
    </div>
  );
};
