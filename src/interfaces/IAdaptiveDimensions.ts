import { DimensionsTypes } from '@src/enums/DimensionsTypes';
import { IMediaValue } from '@src/interfaces/IMediaValue';

export type IAdaptiveDimensions = {
  [K in DimensionsTypes]?: IMediaValue[];
}
