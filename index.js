require('./lib/expandableGrid.css');
var expandableGrid = require('./lib/expandableGrid');

expandableGrid.DimensionsTypes = {
    ITEM_HEIGHT: 'itemHeight',
    COLUMNS_COUNT: 'columnsCount',
    ROW_GAP: 'rowGap',
    COLUMN_GAP: 'columnGap',
    EXPANDED_ITEM_HEIGHT: 'expandedItemHeight',
}

expandableGrid.EntityTypes = {
    GRID: 'grid',
    ITEM: 'item',
}

module.exports = expandableGrid;
