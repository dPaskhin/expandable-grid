interface IParams {
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
}: IParams) => {
  const isThereExpandedItem = expandedItem !== null;
  const isThereManyItemsInLastRow = itemsCount % columnsCount !== 1;
  const isThereManyColumnsInGrid = columnsCount > 1;
  const needAdditionalRow = isThereExpandedItem && isThereManyItemsInLastRow && isThereManyColumnsInGrid;

  const rowsCount = Math.ceil(itemsCount / columnsCount) + (needAdditionalRow ? 1 : 0);

  if (isThereExpandedItem) {
    return rowsCount * itemHeight + diffHeight;
  }

  return rowsCount * itemHeight;
};
