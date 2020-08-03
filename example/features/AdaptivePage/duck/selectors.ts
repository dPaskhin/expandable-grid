import { IRootState } from '@example/app/initStore';

export const adaptiveDimensionsSelector = (state: IRootState) => state.adaptivePage.adaptiveDimensions;
