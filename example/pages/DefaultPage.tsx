import { FC, useState } from 'react';
import { AppTemplate, ExampleItem, LoremParagraph, PositiveNumberField, TabType } from '../components';
import { ExpandableGrid } from '../../lib';
import { fill, range } from 'lodash';
import { List, ListItem, Stack } from '@mui/material';
import { useLocation } from 'wouter';
import { ADAPTIVE_PAGE_ROUTE } from './AdaptivePage';

export const DefaultPage: FC = () => {
  const [columnCount, setColumnCount] = useState(5);
  const [itemCount, setItemCount] = useState(8);
  const [itemHeight, setItemHeight] = useState(200);
  const [expandedItemHeight, setExpandedItemHeight] = useState(400);
  const [columnGap, setColumnGap] = useState(20);
  const [rowGap, setRowGap] = useState(10);

  const [, setLocation] = useLocation();

  const handleChangeTab = (value: TabType) => {
    if (value === 'adaptive') {
      setLocation(ADAPTIVE_PAGE_ROUTE);
    }
  };

  return (
    <AppTemplate
      activeTab={'default'}
      onChangeTab={handleChangeTab}
      drawerContent={
        <List>
          <ListItem>
            <PositiveNumberField
              label={"Column's count"}
              value={columnCount}
              fullWidth={true}
              onChange={setColumnCount}
            />
          </ListItem>
          <ListItem>
            <PositiveNumberField
              label={"Item's count"}
              value={itemCount}
              fullWidth={true}
              onChange={setItemCount}
            />
          </ListItem>
          <ListItem>
            <PositiveNumberField
              label={"Item's height"}
              value={itemHeight}
              fullWidth={true}
              onChange={setItemHeight}
            />
          </ListItem>
          <ListItem>
            <PositiveNumberField
              label={"Expanded item's height"}
              value={expandedItemHeight}
              fullWidth={true}
              onChange={setExpandedItemHeight}
            />
          </ListItem>
          <ListItem>
            <Stack
              direction={'row'}
              columnGap={1}
            >
              <PositiveNumberField
                label={"Column's gap"}
                value={columnGap}
                fullWidth={true}
                onChange={setColumnGap}
              />
              <PositiveNumberField
                label={"Row's gap"}
                value={rowGap}
                fullWidth={true}
                onChange={setRowGap}
              />
            </Stack>
          </ListItem>
        </List>
      }
    >
      <ExpandableGrid
        items={fill(range(itemCount), ExampleItem)}
        columnsCount={columnCount}
        parameters={{ itemHeight, expandedItemHeight, rowGap, columnGap }}
        style={{ transitionDuration: '100ms' }}
        itemStyle={{ transitionDuration: '200ms' }}
      />

      <LoremParagraph />
    </AppTemplate>
  );
};

export const DEFAULT_PAGE_ROUTER = '/';
