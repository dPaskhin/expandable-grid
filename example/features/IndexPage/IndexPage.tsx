import React, { useMemo } from 'react';

import { ExpandableGrid } from '@src/ExpandableGrid';

import { getItems } from '@common/utils/getItems';
import { ExampleItem } from '@common/components/ExampleItem/ExampleItem';
import { LoremText } from '@common/components/LoremText/LoremText';

export const IndexPage = () => {
  const items = useMemo(() => getItems(), []);

  return (
    <>
      <ExpandableGrid
        renderItems={items.map((item, index) => (
          ({ isExpanded, onExpand, onClose }) => (
            <ExampleItem
              key={index}
              isExpanded={isExpanded}
              onClose={onClose}
              onClick={onExpand}
              style={{ backgroundColor: item }}
            />
          )
        ))}
      />

      <LoremText/>
    </>
  );
};
