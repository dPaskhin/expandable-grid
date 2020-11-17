interface IParams {
  expandedItem: number | null;
  itemsCount: number;
  columnsCount: number;
  itemHeight: number;
  diffHeight: number;
  rowGap: number;
}

export const getGridHeight = ({
  expandedItem,
  itemsCount,
  columnsCount,
  itemHeight,
  diffHeight,
  rowGap
}: IParams) => {
  const isThereExpandedItem = expandedItem !== null;
  const isThereManyItemsInLastRow = itemsCount % columnsCount !== 1;
  const isThereManyColumnsInGrid = columnsCount > 1;
  const needAdditionalRow = isThereExpandedItem && isThereManyItemsInLastRow && isThereManyColumnsInGrid;

  const rowsCount = Math.ceil(itemsCount / columnsCount) + (needAdditionalRow ? 1 : 0);

  const gapHeight = (rowsCount - 1) * rowGap;

  if (isThereExpandedItem) {
    return rowsCount * itemHeight + diffHeight + gapHeight;
  }

  return rowsCount * itemHeight + gapHeight;
};
