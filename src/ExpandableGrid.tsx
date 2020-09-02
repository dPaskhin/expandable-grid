import React, { useEffect } from 'react';

import '@src/style/expandable.css';
import { IProps } from '@src/interfaces/IProps';
import { GridClassnames } from '@src/enums/GridClassnames';
import { getGridItemClass } from '@src/utils/getGridItemClass';
import { useDimensions } from '@src/hooks/useDimensions';
import { useWindowWidth } from '@src/hooks/useWindowWidth';
import { useGridItems } from '@src/hooks/useGridItems';
import { useGridHeight } from '@src/hooks/useGridHeght';
import { useGridStyles } from '@src/hooks/useGridStyles';
import { useGridItemStylesGetter } from '@src/hooks/useGridItemStylesGetter';
import { useExpandedItem } from '@src/hooks/useExpandedItem';

export const ExpandableGrid: React.FC<IProps> = ({
  renderItems,
  dimensions,
  adaptiveDimensions,
  transitionDuration,
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
      className={`${GridClassnames.GRID_CLASSNAME} ${gridClassName}`.trim()}
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
            onClose: () => setExpandedItem(null),
          })}
        </div>
      ))}
    </div>
  );
};
