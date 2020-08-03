import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

export const isFilledMediaValue = (value: IMediaValue<number | null>): value is IMediaValue => (
  (value.value !== null && value.value >= 0)
  && (value.windowWidth.min !== null && value.windowWidth.min >= 0)
  && (value.windowWidth.max !== null && value.windowWidth.max >= 0)
);

