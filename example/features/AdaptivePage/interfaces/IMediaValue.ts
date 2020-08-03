import { IMediaValue as IMediaValueBase } from '@lib/interfaces/IMediaValue';

export interface IMediaValue<T = number> extends IMediaValueBase<T> {
  id?: number;
}
