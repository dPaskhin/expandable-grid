import { FC, useState } from 'react';
import {
  AdaptiveParameterField,
  AppTemplate,
  ExampleItem,
  LoremParagraph,
  PositiveNumberField,
  TabType,
} from '../components';
import { useLocation } from 'wouter';
import { DEFAULT_PAGE_ROUTER } from './DefaultPage';
import { ExpandableGrid, MediaQueryParametersMap } from '../../lib';
import { fill, range } from 'lodash';
import { Divider, List, ListItem, ListSubheader } from '@mui/material';

export const AdaptivePage: FC = () => {
  const [, setLocation] = useLocation();

  const [columnCount, setColumnCount] = useState<MediaQueryParametersMap>({ '320': 5 });
  const [itemHeight, setItemHeight] = useState<MediaQueryParametersMap>({ '320': 200 });
  const [expandedItemHeight, setExpandedItemHeight] = useState<MediaQueryParametersMap>({ '320': 400 });
  const [columnGap, setColumnGap] = useState<MediaQueryParametersMap>({ '320': 20 });
  const [rowGap, setRowGap] = useState<MediaQueryParametersMap>({ '320': 10 });
  const [itemCount, setItemCount] = useState(8);

  const handleChangeTab = (value: TabType) => {
    if (value === 'default') {
      setLocation(DEFAULT_PAGE_ROUTER);
    }
  };

  return (
    <AppTemplate
      activeTab={'adaptive'}
      onChangeTab={handleChangeTab}
      drawerContent={
        <List>
          <List subheader={<ListSubheader>{"Item's count"}</ListSubheader>}>
            <ListItem>
              <PositiveNumberField
                value={itemCount}
                fullWidth={true}
                onChange={setItemCount}
              />
            </ListItem>
          </List>

          <Divider />

          <AdaptiveParameterField
            label={"Column's count"}
            defaultValue={columnCount}
            onSubmitted={setColumnCount}
          />

          <Divider />

          <AdaptiveParameterField
            label={"Item's height"}
            defaultValue={itemHeight}
            onSubmitted={setItemHeight}
          />

          <Divider />

          <AdaptiveParameterField
            label={"Expanded item's height"}
            defaultValue={expandedItemHeight}
            onSubmitted={setExpandedItemHeight}
          />

          <Divider />

          <AdaptiveParameterField
            label={"Column's gap"}
            defaultValue={columnGap}
            onSubmitted={setColumnGap}
          />

          <Divider />

          <AdaptiveParameterField
            label={"Row's gap"}
            defaultValue={rowGap}
            onSubmitted={setRowGap}
          />
        </List>
      }
    >
      <ExpandableGrid
        items={fill(range(itemCount), ExampleItem)}
        columnsCount={columnCount}
        parameters={{
          itemHeight,
          expandedItemHeight,
          rowGap,
          columnGap,
        }}
        style={{ transitionDuration: '100ms' }}
        itemStyle={{ transitionDuration: '200ms' }}
      />

      <LoremParagraph />
    </AppTemplate>
  );
};

export const ADAPTIVE_PAGE_ROUTE = '/adaptive';
