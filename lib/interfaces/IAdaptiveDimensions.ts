import { DimensionsTypes } from '@lib/enums/DimensionsTypes';
import { IMediaValue } from '@lib/interfaces/IMediaValue';

export type IAdaptiveDimensions = {
  [K in DimensionsTypes]?: IMediaValue[];
}
