import { EntityTypes } from '@src/enums/EntityTypes';

export type ITransitionDuration = number | { [K in EntityTypes]?: number };
