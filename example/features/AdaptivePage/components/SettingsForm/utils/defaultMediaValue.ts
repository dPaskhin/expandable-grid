import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

export const defaultMediaValue: IMediaValue<number | null> = {
  value: null,
  windowWidth: { min: null, max: null },
};
