import { IMediaValue as IMediaValueBase } from '@src/interfaces/IMediaValue';

export interface IMediaValue<T = number> extends IMediaValueBase<T> {
  id?: number;
}
