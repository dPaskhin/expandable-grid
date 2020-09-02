import { EntityTypes } from '@src/enums/EntityTypes';
import { ITransitionDuration } from '@src/interfaces/ITransitionDuration';

interface IParams {
  entityType: EntityTypes;
  transitionDuration?: ITransitionDuration;
}

export const getTransitionDurationStyleObject = ({
  entityType,
  transitionDuration,
}: IParams) => {
  if (transitionDuration === undefined) {
    return {};
  }

  if (typeof transitionDuration === 'number') {
    return {
      transitionDuration: `${transitionDuration}ms`,
    };
  }

  if (entityType === EntityTypes.GRID && transitionDuration[EntityTypes.GRID] !== undefined) {
    return {
      transitionDuration: `${transitionDuration[EntityTypes.GRID]}ms`,
    };
  }

  if (entityType === EntityTypes.ITEM && transitionDuration[EntityTypes.ITEM] !== undefined) {
    return {
      transitionDuration: `${transitionDuration[EntityTypes.ITEM]}ms`,
    };
  }

  return {};
};
