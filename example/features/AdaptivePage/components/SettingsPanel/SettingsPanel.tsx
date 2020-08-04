import React, { useState } from 'react';
import { Box, Drawer, Tab, Tabs } from '@material-ui/core';

import { CloseRounded } from '@material-ui/icons';

import { SettingsBlock } from '@features/AdaptivePage/components/SettingsBlock/SettingsBlock';
import { IWithAdaptiveSettingsState } from '@features/AdaptivePage/hoc/withAdaptiveSettingsState';
import { isDimensionType } from '@src/typeGuards/isDimensionType';
import { getTabLabel } from '@features/AdaptivePage/components/SettingsPanel/utils/getTabLabel';
import { useClasses } from '@features/AdaptivePage/components/SettingsPanel/hooks/useClasses';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<IProps & IWithAdaptiveSettingsState> = ({
  open,
  onClose,
  adaptiveDimensions,
  setAdaptiveValue,
  deleteAdaptiveValue,
}) => {
  const [tab, setTab] = useState(0);
  const adaptiveDimensionTypes = Object.keys(adaptiveDimensions).filter(isDimensionType);
  const classes = useClasses();

  const TabPanel: React.FC<{ panelIndex: number }> = ({ panelIndex }) => {
    const currentDimensionType = adaptiveDimensionTypes.find((_, index) => index === panelIndex);

    if (!currentDimensionType) {
      return null;
    }

    return (
      <SettingsBlock
        items={adaptiveDimensions[currentDimensionType]}
        onSubmit={item => setAdaptiveValue(currentDimensionType, item)}
        onRemove={id => deleteAdaptiveValue(currentDimensionType, id)}
      />
    );
  };

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      PaperProps={{
        classes: {
          root: classes.drawer,
        },
      }}
    >
      <Box p={1}>
        <Box className={classes.tabsWrapper}>
          <Tabs
            value={tab}
            onChange={(event, value: number) => setTab(value)}
            variant='scrollable'
          >
            {adaptiveDimensionTypes.map(type => (
              <Tab
                key={type}
                label={getTabLabel(type)}
                disableFocusRipple={true}
              />
            ))}
          </Tabs>

          <CloseRounded
            titleAccess='Collapse item'
            onClick={onClose}
            className={classes.closeIcon}
          />
        </Box>

        <TabPanel panelIndex={tab}/>
      </Box>
    </Drawer>
  );
};
