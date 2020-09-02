import React, { useMemo, useState } from 'react';

import { ExpandableGrid } from '@src/ExpandableGrid';
import { getItems } from '@common/utils/getItems';
import { ExampleItem } from '@common/components/ExampleItem/ExampleItem';
import { FloatingButton } from '@common/components/FloatingButton/FloatingButton';
import { SettingsPanel } from '@features/AdaptivePage/components/SettingsPanel/SettingsPanel';
import {
  IWithAdaptiveSettingsState,
  withAdaptiveSettingsState,
} from '@features/AdaptivePage/hoc/withAdaptiveSettingsState';
import { LoremText } from '@common/components/LoremText/LoremText';

const AdaptivePageComponent: React.FC<IWithAdaptiveSettingsState> = ({
  adaptiveDimensions,
  setAdaptiveValue,
  deleteAdaptiveValue,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const items = useMemo(() => getItems(), []);

  return (
    <>
      <ExpandableGrid
        adaptiveDimensions={adaptiveDimensions}
        renderItems={items.map((item, index) => (
          ({ isExpanded, onClose, onExpand }) => (
            <ExampleItem
              key={index}
              isExpanded={isExpanded}
              onClick={onExpand}
              onClose={onClose}
              style={{ backgroundColor: item }}
            />
          )
        ))}
      />

      <LoremText/>

      <SettingsPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        adaptiveDimensions={adaptiveDimensions}
        setAdaptiveValue={setAdaptiveValue}
        deleteAdaptiveValue={deleteAdaptiveValue}
      />

      <FloatingButton onClick={() => setPanelOpen(true)}/>
    </>
  );
};

export const AdaptivePage = withAdaptiveSettingsState(AdaptivePageComponent);
