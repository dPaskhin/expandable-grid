import { GridStyles } from '../main/GridStyles';
import { Grid } from '../main/Grid';
import { ExpandableGridParameters } from '../main';

const parameters: ExpandableGridParameters = {
  rowGap: 20,
  columnGap: 20,
  itemHeight: 150,
  expandedItemHeight: 350,
};

describe('GridStyles', () => {
  it('should be a function', () => {
    expect(typeof GridStyles).toBe('function');
  });

  it('should calculate grid height', () => {
    const oneColumnGrid = new Grid(1, 3, () => null);
    const oneColumnGridStyles = new GridStyles(oneColumnGrid, parameters);

    expect(oneColumnGridStyles.getGridStyles().height).toBe(500);

    const oneLastRowItemGrid = new Grid(5, 6, () => null);
    const oneLastRowItemGridStyles = new GridStyles(oneLastRowItemGrid, parameters);

    expect(oneLastRowItemGridStyles.getGridStyles().height).toBe(330);

    const twoLastRowItemGrid = new Grid(3, 5, () => null);
    const twoLastRowItemGridStyles = new GridStyles(twoLastRowItemGrid, parameters);

    expect(twoLastRowItemGridStyles.getGridStyles().height).toBe(330);

    const fullLastRowItemGrid = new Grid(3, 6, () => null);
    const fullLastRowItemGridStyles = new GridStyles(fullLastRowItemGrid, parameters);

    expect(fullLastRowItemGridStyles.getGridStyles().height).toBe(330);
  });

  it('should calculate shifted grid height', () => {
    const oneColumnGrid = new Grid(1, 3, () => null);
    oneColumnGrid.expandItem(oneColumnGrid.items[1]!);
    const oneColumnGridStyles = new GridStyles(oneColumnGrid, parameters);

    expect(oneColumnGridStyles.getGridStyles().height).toBe(700);

    const oneLastRowItemGrid = new Grid(5, 6, () => null);
    oneLastRowItemGrid.expandItem(oneLastRowItemGrid.items[1]!);
    const oneLastRowItemGridStyles = new GridStyles(oneLastRowItemGrid, parameters);

    expect(oneLastRowItemGridStyles.getGridStyles().height).toBe(530);

    const twoLastRowItemGrid = new Grid(3, 5, () => null);
    twoLastRowItemGrid.expandItem(twoLastRowItemGrid.items[1]!);
    const twoLastRowItemGridStyles = new GridStyles(twoLastRowItemGrid, parameters);

    expect(twoLastRowItemGridStyles.getGridStyles().height).toBe(700);

    const fullLastRowItemGrid = new Grid(3, 6, () => null);
    fullLastRowItemGrid.expandItem(fullLastRowItemGrid.items[2]!);
    const fullLastRowItemGridStyles = new GridStyles(fullLastRowItemGrid, parameters);

    expect(fullLastRowItemGridStyles.getGridStyles().height).toBe(700);
  });

  it("should calculate items' position", () => {
    const oneColumnGrid = new Grid(1, 3, () => null);
    const oneColumnGridStyles = new GridStyles(oneColumnGrid, parameters);

    expect(oneColumnGridStyles.getItemStyles(oneColumnGrid.items[1]!).top).toBe(170);
    expect(oneColumnGridStyles.getItemStyles(oneColumnGrid.items[1]!).left).toBe('0%');
    expect(oneColumnGridStyles.getItemStyles(oneColumnGrid.items[1]!).right).toBe('0%');

    oneColumnGrid.expandItem(oneColumnGrid.items[0]!);

    expect(oneColumnGridStyles.getItemStyles(oneColumnGrid.items[1]!).top).toBe(370);
    expect(oneColumnGridStyles.getItemStyles(oneColumnGrid.items[1]!).left).toBe('0%');
    expect(oneColumnGridStyles.getItemStyles(oneColumnGrid.items[1]!).right).toBe('0%');

    const oneLastRowItemGrid = new Grid(5, 6, () => null);
    const oneLastRowItemGridStyles = new GridStyles(oneLastRowItemGrid, parameters);

    expect(oneLastRowItemGridStyles.getItemStyles(oneLastRowItemGrid.items[4]!).top).toBe(0);
    expect(oneLastRowItemGridStyles.getItemStyles(oneLastRowItemGrid.items[4]!).left).toBe('80%');
    expect(oneLastRowItemGridStyles.getItemStyles(oneLastRowItemGrid.items[4]!).right).toBe('0%');

    oneLastRowItemGrid.expandItem(oneLastRowItemGrid.items[0]!);

    expect(oneLastRowItemGridStyles.getItemStyles(oneLastRowItemGrid.items[1]!).top).toBe(370);
    expect(oneLastRowItemGridStyles.getItemStyles(oneLastRowItemGrid.items[1]!).left).toBe('0%');
    expect(oneLastRowItemGridStyles.getItemStyles(oneLastRowItemGrid.items[1]!).right).toBe('80%');

    const twoLastRowItemGrid = new Grid(3, 5, () => null);
    const twoLastRowItemGridStyles = new GridStyles(twoLastRowItemGrid, parameters);

    expect(twoLastRowItemGridStyles.getItemStyles(twoLastRowItemGrid.items[4]!).top).toBe(170);
    expect(twoLastRowItemGridStyles.getItemStyles(twoLastRowItemGrid.items[4]!).left).toBe(100 / 3 + '%');
    expect(twoLastRowItemGridStyles.getItemStyles(twoLastRowItemGrid.items[4]!).right).toBe(100 / 3 + '%');

    twoLastRowItemGrid.expandItem(twoLastRowItemGrid.items[1]!);

    expect(twoLastRowItemGridStyles.getItemStyles(twoLastRowItemGrid.items[3]!).top).toBe(370);
    expect(twoLastRowItemGridStyles.getItemStyles(twoLastRowItemGrid.items[3]!).left).toBe((100 / 3) * 2 + '%');
    expect(twoLastRowItemGridStyles.getItemStyles(twoLastRowItemGrid.items[3]!).right).toBe('0%');

    const fullLastRowItemGrid = new Grid(3, 6, () => null);
    const fullLastRowItemGridStyles = new GridStyles(fullLastRowItemGrid, parameters);

    expect(fullLastRowItemGridStyles.getItemStyles(fullLastRowItemGrid.items[2]!).top).toBe(0);
    expect(fullLastRowItemGridStyles.getItemStyles(fullLastRowItemGrid.items[2]!).left).toBe((100 / 3) * 2 + '%');
    expect(fullLastRowItemGridStyles.getItemStyles(fullLastRowItemGrid.items[2]!).right).toBe('0%');

    fullLastRowItemGrid.expandItem(fullLastRowItemGrid.items[3]!);

    expect(fullLastRowItemGridStyles.getItemStyles(fullLastRowItemGrid.items[3]!).top).toBe(170);
    expect(fullLastRowItemGridStyles.getItemStyles(fullLastRowItemGrid.items[3]!).left).toBe(0);
    expect(fullLastRowItemGridStyles.getItemStyles(fullLastRowItemGrid.items[3]!).right).toBe(0);
  });
});
