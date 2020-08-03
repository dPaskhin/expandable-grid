import { ICoord } from '@lib/interfaces/ICord';

interface IParams {
  itemId: number;
  columnsCount: number;
}

const getItemX = ({
  itemId,
  columnsCount,
}: IParams) => {
  for (let i = 0; i <= columnsCount; i++) {
    if (itemId % columnsCount === 0) {
      return 0;
    }

    if ((itemId + i) % columnsCount === 0) {
      return columnsCount - i;
    }
  }

  return 0;
};

const getItemY = ({
  itemId,
  columnsCount,
}: IParams) => (
  Math.floor(itemId / columnsCount)
);

export const getItemCoord = ({
  itemId,
  columnsCount,
}: IParams): ICoord => ({
  x: getItemX({ itemId, columnsCount }),
  y: getItemY({ itemId, columnsCount }),
});
