import React from 'react';
import sortBy from 'lodash/sortBy';

import { useFormWarnings } from '@features/AdaptivePage/components/SettingsBlock/hooks/useFormWarnings';
import { SettingsForm } from '@features/AdaptivePage/components/SettingsForm/SettingsForm';
import { SettingsTable } from '@features/AdaptivePage/components/SettingTable/SettingsTable';
import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

export interface IProps {
  items: Array<Required<IMediaValue>>;
  onSubmit: (item: IMediaValue) => void;
  onRemove: (id: number) => void;
}

export const SettingsBlock: React.FC<IProps> = ({
  items,
  onSubmit,
  onRemove,
}) => {
  const sortedItems = sortBy(items, [item => item.windowWidth.min, item => item.windowWidth.max]);
  const warnings = useFormWarnings(sortedItems);

  return (
    <>
      <SettingsForm
        onSubmit={onSubmit}
        warnings={warnings}
      />
      <SettingsTable
        items={sortedItems}
        onRemove={onRemove}
      />
    </>
  );
};
