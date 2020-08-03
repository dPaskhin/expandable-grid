import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

export const defaultMediaValue: IMediaValue<number | null> = {
  id: null,
  value: null,
  windowWidth: { min: null, max: null },
};
