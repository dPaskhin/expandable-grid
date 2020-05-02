import { IMediaValue } from '@lib/interfaces/IMediaValue';

export const sortMediaValues = <T extends IMediaValue>(values: T[]): T[] => (
  [...values].sort((a, b) => a.windowWidth.min - b.windowWidth.min)
);
