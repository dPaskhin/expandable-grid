export const getGridMargins = (
    rowGap: number | null,
    columnGap: number | null
) => ({
    marginTop: rowGap ? -rowGap / 2 : undefined,
    marginLeft: columnGap ? -columnGap / 2 : undefined,
})

export const getGridItemPadding = (
    rowGap: number | null,
    columnGap: number | null
) => ({
    paddingTop: rowGap ? rowGap / 2 : undefined,
    paddingBottom: rowGap ? rowGap / 2 : undefined,
    paddingLeft: columnGap ? columnGap / 2 : undefined,
    paddingRight: columnGap ? columnGap / 2 : undefined,
})

interface IGetGridHeight {
    expandedItem: number | null,
    itemsCount: number,
    columnsCount: number,
    itemHeight: number,
    diffHeight: number,
}

export const getGridHeight = ({
    expandedItem,
    itemsCount,
    columnsCount,
    itemHeight,
    diffHeight,
}: IGetGridHeight) => {
    const needAdditionalRow =
        expandedItem &&
        itemsCount % columnsCount !== 1 &&
        columnsCount > 1
    const rowsCount = Math.ceil(itemsCount / columnsCount) + (needAdditionalRow ? 1 : 0)

    if (expandedItem) {
        return rowsCount * itemHeight + diffHeight
    }

    return rowsCount * itemHeight
}
