import React, { useEffect } from 'react';

import '@lib/style/expandable.css';

import { IProps } from '@lib/interfaces/IProps';
import { GridClassnames } from '@lib/enums/GridClassnames';
import { getChildrenItem } from '@lib/utils/getChildrenItem';
import { getGridItemClass } from '@lib/utils/getGridItemClass';
import { isChildrenPassed } from '@lib/utils/isChildrenPassed';
import { useDimensions } from '@lib/hooks/useDimensions';
import { useWindowWidth } from '@lib/hooks/useWindowWidth';
import { useExpandedItem } from '@lib/hooks/useExpandedItem';
import { useGridItems } from '@lib/hooks/useGridItems';
import { useGridHeight } from '@lib/hooks/useGridHeght';
import { useGridStyles } from '@lib/hooks/useGridStyles';
import { useGridItemStylesGetter } from '@lib/hooks/useGridItemStylesGetter';

export const ExpandableGrid: React.FC<IProps> = ({
  children,
  expandedItem: exExpandedItem = null,
  dimensions: exDimensions,
  adaptiveDimensions,
  transitionDuration = 200,
  gridClassName = '',
  gridItemClassName = '',
  afterColumnsCountChanged,
}) => {
  const windowWidth = useWindowWidth(!!adaptiveDimensions);

  const {
    itemHeight,
    columnsCount,
    rowGap,
    columnGap,
    expandedItemHeight,
  } = useDimensions(windowWidth, exDimensions, adaptiveDimensions);

  const diffHeight = expandedItemHeight - itemHeight;

  const [expandedItem, setExpandedItem] = useExpandedItem(exExpandedItem);

  const items = useGridItems({
    itemsCount: Array.isArray(children) ? children.length : 1,
    columnsCount,
    expandedItem,
  });

  useEffect(() => {
    if (afterColumnsCountChanged) {
      afterColumnsCountChanged(columnsCount);
    }
    setExpandedItem(null);
  }, [columnsCount]);

  const gridHeight = useGridHeight({
    itemHeight,
    diffHeight,
    itemsCount: items.length,
    columnsCount,
    expandedItem,
  });

  const gridStyles = useGridStyles({
    rowGap,
    columnGap,
    transitionDuration,
    gridHeight,
  });

  const getGridItemStyles = useGridItemStylesGetter({
    transitionDuration,
    columnsCount,
    itemHeight,
    diffHeight,
    rowGap,
    columnGap,
    expandedItemHeight,
  });

  if (!isChildrenPassed(children)) {
    return null;
  }

  return (
    <div
      className={`${GridClassnames.GRID_CLASSNAME} ${gridClassName}`}
      style={gridStyles}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={getGridItemClass({
            isExpanded: exExpandedItem === index,
            extraClass: gridItemClassName,
          })}
          style={getGridItemStyles(item, index === exExpandedItem)}
        >
          {getChildrenItem(children, index)}
        </div>
      ))}
    </div>
  );
};
