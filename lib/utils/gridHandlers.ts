export const getGridMargins = (rowGap: number | null, columnGap: number | null) => {
    return {
        marginTop: rowGap !== null ? -rowGap / 2 : undefined,
        marginLeft: columnGap !== null ? -columnGap / 2 : undefined,
    }
}

export const getGridItemPadding = (rowGap: number | null, columnGap: number | null) => {
    return {
        paddingTop: rowGap !== null ? rowGap / 2 : undefined,
        paddingBottom: rowGap !== null ? rowGap / 2 : undefined,
        paddingLeft: columnGap !== null ? columnGap / 2 : undefined,
        paddingRight: columnGap !== null ? columnGap / 2 : undefined,
    }
}

interface IGetGridHeight {
    expandedItem: number | null,
    itemsCount: number,
    columnsCount: number,
    itemHeight: number,
    diffHeight: number,
}

export const getGridHeight: (args: IGetGridHeight) => number = ({
    expandedItem,
    itemsCount,
    columnsCount,
    itemHeight,
    diffHeight
}) => {
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
