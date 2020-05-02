interface IGetGridHeight {
  expandedItem: number | null;
  itemsCount: number;
  columnsCount: number;
  itemHeight: number;
  diffHeight: number;
}

export const getGridHeight = ({
  expandedItem,
  itemsCount,
  columnsCount,
  itemHeight,
  diffHeight,
}: IGetGridHeight) => {
  const needAdditionalRow = expandedItem
    && itemsCount % columnsCount !== 1
    && columnsCount > 1;
  const rowsCount = Math.ceil(itemsCount / columnsCount) + (needAdditionalRow ? 1 : 0);

  if (expandedItem) {
    return rowsCount * itemHeight + diffHeight;
  }

  return rowsCount * itemHeight;
};
