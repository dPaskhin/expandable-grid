import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DimensionsTypes } from '@lib/enums/DimensionsTypes';
import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';
import { IAdaptiveDimensions } from '@features/AdaptivePage/interfaces/IAdaptiveDimensions';

export interface IState {
  adaptiveDimensions: IAdaptiveDimensions;
}

export const { reducer, actions } = createSlice({
  name: 'adaptivePage',
  initialState: {
    adaptiveDimensions: {
      [DimensionsTypes.ITEM_HEIGHT]: [],
      [DimensionsTypes.COLUMNS_COUNT]: [{
        id: 0,
        windowWidth: {
          min: 320,
          max: 768,
        },
        value: 1,
      }, {
        id: 1,
        windowWidth: {
          min: 769,
          max: 960,
        },
        value: 3,
      }, {
        id: 2,
        windowWidth: {
          min: 961,
          max: 1200,
        },
        value: 5,
      }, {
        id: 3,
        windowWidth: {
          min: 1201,
          max: 1360,
        },
        value: 6,
      }],
      [DimensionsTypes.ROW_GAP]: [],
      [DimensionsTypes.COLUMN_GAP]: [],
      [DimensionsTypes.EXPANDED_ITEM_HEIGHT]: [],
    },
  } as IState,
  reducers: {
    setValue: (state, action: PayloadAction<{ dimensionType: DimensionsTypes; mediaValue: IMediaValue }>) => {
      const {
        dimensionType,
        mediaValue,
      } = action.payload;

      const dimensionValues = state.adaptiveDimensions[dimensionType];
      const lastId = dimensionValues[dimensionValues.length - 1]?.id || 0;

      state.adaptiveDimensions[dimensionType] = [
        ...dimensionValues,
        {
          ...mediaValue,
          id: lastId + 1,
        },
      ];
    },
    deleteValue: (state, action: PayloadAction<{ dimensionType: DimensionsTypes; valueId: number }>) => {
      const {
        dimensionType,
        valueId,
      } = action.payload;

      state.adaptiveDimensions[dimensionType] = state.adaptiveDimensions[dimensionType].filter(
        value => value.id !== valueId,
      );
    },
  },
});
