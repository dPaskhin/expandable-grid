import { IMediaValue } from '@lib/interfaces/IMediaValue';

export const sortMediaValues = (values: IMediaValue[]) => (
  [...values].sort((a, b) => a.windowWidth.min - b.windowWidth.min)
);
