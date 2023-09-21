import { Grid } from '../main/Grid';

describe('Grid', () => {
  it('should be a function', () => {
    expect(typeof Grid).toBe('function');
  });

  it('should create a bunch of items', () => {
    const itemsCount = 7;

    const grid = new Grid(3, itemsCount, () => null);

    expect(Array.isArray(grid.items)).toBe(true);
    expect(grid.items.length).toBe(itemsCount);
    expect(grid.items.length).toBe(grid.itemsCount);
  });

  it('should create a bunch of items [corner cases]', () => {
    const zeroItemsGrid = new Grid(3, 0, () => null);
    const negativeItemsGrid = new Grid(3, -1, () => null);
    const zeroColumnsGrid = new Grid(0, 0, () => null);
    const negativeColumnsGrid = new Grid(-1, 0, () => null);

    expect(zeroItemsGrid.items.length).toBe(0);
    expect(negativeItemsGrid.columnsCount).toBe(3);

    expect(zeroColumnsGrid.items.length).toBe(0);
    expect(negativeColumnsGrid.columnsCount).toBe(-1);

    const thousandItemsGrid = new Grid(3, 1000, () => null);
    const thousandColumnsGrid = new Grid(1000, 3, () => null);

    expect(thousandItemsGrid.items.length).toBe(1000);
    expect(thousandColumnsGrid.columnsCount).toBe(1000);
  });

  it("should calculate items' coordinates", () => {
    const treeColumnsGrid = new Grid(3, 7, () => null);

    expect(treeColumnsGrid.items[0]?.x).toBe(0);
    expect(treeColumnsGrid.items[0]?.y).toBe(0);

    expect(treeColumnsGrid.items[1]?.x).toBe(1);
    expect(treeColumnsGrid.items[1]?.y).toBe(0);

    expect(treeColumnsGrid.items[2]?.x).toBe(2);
    expect(treeColumnsGrid.items[2]?.y).toBe(0);

    expect(treeColumnsGrid.items[3]?.x).toBe(0);
    expect(treeColumnsGrid.items[3]?.y).toBe(1);

    expect(treeColumnsGrid.items[4]?.x).toBe(1);
    expect(treeColumnsGrid.items[4]?.y).toBe(1);

    expect(treeColumnsGrid.items[5]?.x).toBe(2);
    expect(treeColumnsGrid.items[5]?.y).toBe(1);

    expect(treeColumnsGrid.items[6]?.x).toBe(0);
    expect(treeColumnsGrid.items[6]?.y).toBe(2);

    const sixColumnsGrid = new Grid(6, 7, () => null);

    expect(sixColumnsGrid.items[0]?.x).toBe(0);
    expect(sixColumnsGrid.items[0]?.y).toBe(0);

    expect(sixColumnsGrid.items[1]?.x).toBe(1);
    expect(sixColumnsGrid.items[1]?.y).toBe(0);

    expect(sixColumnsGrid.items[2]?.x).toBe(2);
    expect(sixColumnsGrid.items[2]?.y).toBe(0);

    expect(sixColumnsGrid.items[3]?.x).toBe(3);
    expect(sixColumnsGrid.items[3]?.y).toBe(0);

    expect(sixColumnsGrid.items[4]?.x).toBe(4);
    expect(sixColumnsGrid.items[4]?.y).toBe(0);

    expect(sixColumnsGrid.items[5]?.x).toBe(5);
    expect(sixColumnsGrid.items[5]?.y).toBe(0);

    expect(sixColumnsGrid.items[6]?.x).toBe(0);
    expect(sixColumnsGrid.items[6]?.y).toBe(1);

    const oneColumnGrid = new Grid(1, 7, () => null);

    expect(oneColumnGrid.items[0]?.x).toBe(0);
    expect(oneColumnGrid.items[0]?.y).toBe(0);

    expect(oneColumnGrid.items[1]?.x).toBe(0);
    expect(oneColumnGrid.items[1]?.y).toBe(1);

    expect(oneColumnGrid.items[2]?.x).toBe(0);
    expect(oneColumnGrid.items[2]?.y).toBe(2);

    expect(oneColumnGrid.items[3]?.x).toBe(0);
    expect(oneColumnGrid.items[3]?.y).toBe(3);

    expect(oneColumnGrid.items[4]?.x).toBe(0);
    expect(oneColumnGrid.items[4]?.y).toBe(4);

    expect(oneColumnGrid.items[5]?.x).toBe(0);
    expect(oneColumnGrid.items[5]?.y).toBe(5);

    expect(oneColumnGrid.items[6]?.x).toBe(0);
    expect(oneColumnGrid.items[6]?.y).toBe(6);

    const oneItemGrid = new Grid(3, 1, () => null);

    expect(oneItemGrid.items[0]?.x).toBe(0);
    expect(oneItemGrid.items[0]?.y).toBe(0);
  });

  it('should expand and collapse an item', () => {
    const grid = new Grid(3, 7, () => null);

    expect(grid.hasExpanded).toBe(false);
    expect(grid.expandedItem).toBe(undefined);

    const itemToExpand = grid.items[1]!;

    grid.expandItem(itemToExpand);

    expect(grid.hasExpanded).toBe(true);
    expect(grid.expandedItem).toBe(itemToExpand);
    expect(grid.isItemExpanded(itemToExpand)).toBe(true);

    grid.collapseExpandedItem();

    expect(grid.hasExpanded).toBe(false);
    expect(grid.expandedItem).toBe(undefined);
    expect(grid.isItemExpanded(itemToExpand)).toBe(false);

    grid.toggleExpandedItem(itemToExpand);

    expect(grid.hasExpanded).toBe(true);
    expect(grid.expandedItem).toBe(itemToExpand);
    expect(grid.isItemExpanded(itemToExpand)).toBe(true);

    grid.toggleExpandedItem(itemToExpand);

    expect(grid.hasExpanded).toBe(false);
    expect(grid.expandedItem).toBe(undefined);
    expect(grid.isItemExpanded(itemToExpand)).toBe(false);
  });

  it("should recalculate items' coordinates with expanded one", () => {
    const treeColumnsGrid = new Grid(3, 7, () => null);

    treeColumnsGrid.expandItem(treeColumnsGrid.items[2]!);

    expect(treeColumnsGrid.items[0]?.x).toBe(0);
    expect(treeColumnsGrid.items[0]?.y).toBe(1);

    expect(treeColumnsGrid.items[1]?.x).toBe(1);
    expect(treeColumnsGrid.items[1]?.y).toBe(1);

    expect(treeColumnsGrid.items[2]?.x).toBe(0);
    expect(treeColumnsGrid.items[2]?.y).toBe(0);

    expect(treeColumnsGrid.items[3]?.x).toBe(2);
    expect(treeColumnsGrid.items[3]?.y).toBe(1);

    expect(treeColumnsGrid.items[4]?.x).toBe(0);
    expect(treeColumnsGrid.items[4]?.y).toBe(2);

    expect(treeColumnsGrid.items[5]?.x).toBe(1);
    expect(treeColumnsGrid.items[5]?.y).toBe(2);

    expect(treeColumnsGrid.items[6]?.x).toBe(2);
    expect(treeColumnsGrid.items[6]?.y).toBe(2);

    const sixColumnsGrid = new Grid(6, 7, () => null);

    sixColumnsGrid.expandItem(sixColumnsGrid.items[3]!);

    expect(sixColumnsGrid.items[0]?.x).toBe(0);
    expect(sixColumnsGrid.items[0]?.y).toBe(1);

    expect(sixColumnsGrid.items[1]?.x).toBe(1);
    expect(sixColumnsGrid.items[1]?.y).toBe(1);

    expect(sixColumnsGrid.items[2]?.x).toBe(2);
    expect(sixColumnsGrid.items[2]?.y).toBe(1);

    expect(sixColumnsGrid.items[3]?.x).toBe(0);
    expect(sixColumnsGrid.items[3]?.y).toBe(0);

    expect(sixColumnsGrid.items[4]?.x).toBe(3);
    expect(sixColumnsGrid.items[4]?.y).toBe(1);

    expect(sixColumnsGrid.items[5]?.x).toBe(4);
    expect(sixColumnsGrid.items[5]?.y).toBe(1);

    expect(sixColumnsGrid.items[6]?.x).toBe(5);
    expect(sixColumnsGrid.items[6]?.y).toBe(1);

    const oneColumnGrid = new Grid(1, 7, () => null);

    oneColumnGrid.expandItem(oneColumnGrid.items[2]!);

    expect(oneColumnGrid.items[0]?.x).toBe(0);
    expect(oneColumnGrid.items[0]?.y).toBe(0);

    expect(oneColumnGrid.items[1]?.x).toBe(0);
    expect(oneColumnGrid.items[1]?.y).toBe(1);

    expect(oneColumnGrid.items[2]?.x).toBe(0);
    expect(oneColumnGrid.items[2]?.y).toBe(2);

    expect(oneColumnGrid.items[3]?.x).toBe(0);
    expect(oneColumnGrid.items[3]?.y).toBe(3);

    expect(oneColumnGrid.items[4]?.x).toBe(0);
    expect(oneColumnGrid.items[4]?.y).toBe(4);

    expect(oneColumnGrid.items[5]?.x).toBe(0);
    expect(oneColumnGrid.items[5]?.y).toBe(5);

    expect(oneColumnGrid.items[6]?.x).toBe(0);
    expect(oneColumnGrid.items[6]?.y).toBe(6);

    const oneItemGrid = new Grid(3, 1, () => null);

    oneItemGrid.expandItem(oneItemGrid.items[0]!);

    expect(oneItemGrid.items[0]?.x).toBe(0);
    expect(oneItemGrid.items[0]?.y).toBe(0);
  });

  it('should trigger `onItemExpandedChanged callback`', () => {
    const fn = jest.fn();

    const grid = new Grid(3, 7, fn);

    grid.toggleExpandedItem(grid.items[1]!);
    grid.toggleExpandedItem(grid.items[1]!);
    grid.collapseExpandedItem();

    expect(fn).toHaveBeenCalledTimes(3);
  });
});
