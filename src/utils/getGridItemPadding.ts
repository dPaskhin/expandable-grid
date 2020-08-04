export const getGridItemPadding = (
  rowGap: number,
  columnGap: number,
) => ({
  paddingTop: rowGap / 2,
  paddingBottom: rowGap / 2,
  paddingLeft: columnGap / 2,
  paddingRight: columnGap / 2,
});
