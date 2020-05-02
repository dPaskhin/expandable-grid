import { Draft, produce } from 'immer';

import { InferValueTypes } from '@common/utils/inferValue';
import { IMediaValue } from '@common/interfaces/IMediaValue';

import { IAdaptiveSettings } from '@features/AdaptivePage/interfaces/IAdaptiveSettings';
import { Creators, Types } from '@features/AdaptivePage/duck/actions';
import { AdaptiveValueTypes } from '@features/AdaptivePage/enums/AdaptiveValueTypes';

export const initState: IAdaptiveSettings = {
  [AdaptiveValueTypes.HEIGHTS]: [],
  [AdaptiveValueTypes.COLUMNS]: [],
  [AdaptiveValueTypes.ROW_GAPS]: [],
  [AdaptiveValueTypes.COLUMN_GAPS]: [],
};

type ActionsType = ReturnType<InferValueTypes<typeof Creators>>
type ReducerType = (draft: Draft<IAdaptiveSettings>, action: ActionsType) => void

export const reducer = produce<ReducerType>((
  draft,
  { type, name, payload },
) => {
  switch (type) {
  case Types.SET_ADAPTIVE_VALUE: {
    const dimension = draft[name];
    const lastId = dimension.length > 0 ? dimension[dimension.length - 1].id : 0;

    dimension.push({
      ...payload as IMediaValue,
      id: lastId! + 1,
    });
    break;
  }
  case Types.DELETE_ADAPTIVE_VALUE: {
    draft[name] = draft[name].filter(value => value.id !== payload);
    break;
  }
  }
});
