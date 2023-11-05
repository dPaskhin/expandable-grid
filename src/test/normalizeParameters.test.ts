import {
  ExpandableGridParameters,
  MediaQueryValue,
  normalizeColumnsCount,
  normalizeParameters,
} from '../main/normalizeParameters';

describe('Normalize parameters utils', () => {
  it("should get certain columns' count", () => {
    const columnsCount: MediaQueryValue = { '0': 0, '100': 100, 200: 200 };

    expect(normalizeColumnsCount(columnsCount, 50)).toBe(0);
    expect(normalizeColumnsCount(columnsCount, 250)).toBe(200);

    expect(normalizeColumnsCount(columnsCount, 0)).toBe(0);
    expect(normalizeColumnsCount(columnsCount, 1)).toBe(0);
    expect(normalizeColumnsCount(columnsCount, 100)).toBe(100);
    expect(normalizeColumnsCount(columnsCount, 101)).toBe(100);
    expect(normalizeColumnsCount(columnsCount, 199)).toBe(100);
    expect(normalizeColumnsCount(columnsCount, 200)).toBe(200);
    expect(normalizeColumnsCount(columnsCount, 500)).toBe(200);

    expect(normalizeColumnsCount(10, 500)).toBe(10);

    expect(normalizeColumnsCount({ '100': 100, 200: 200 }, 10)).toBe(100);
  });

  it('should get certain parameters', () => {
    const parameters: ExpandableGridParameters = {
      rowGap: { '0': 0, '100': 100, 200: 200 },
      columnGap: 10,
      itemHeight: { '0': 0, '100': 100, 200: 200 },
    };

    expect(normalizeParameters(parameters, 50)).toStrictEqual({
      rowGap: 0,
      columnGap: 10,
      itemHeight: 0,
      expandedExtraHeight: 350,
      expandedItemHeight: 350,
      outerExpandedItemHeight: 350,
      outerItemHeight: 0,
    });
    expect(normalizeParameters(parameters, 250)).toStrictEqual({
      rowGap: 200,
      columnGap: 10,
      itemHeight: 200,
      expandedExtraHeight: 150,
      expandedItemHeight: 350,
      outerExpandedItemHeight: 550,
      outerItemHeight: 400,
    });

    expect(normalizeParameters(parameters, 0)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 350,
      expandedItemHeight: 350,
      itemHeight: 0,
      outerExpandedItemHeight: 350,
      outerItemHeight: 0,
      rowGap: 0,
    });
    expect(normalizeParameters(parameters, 1)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 350,
      expandedItemHeight: 350,
      itemHeight: 0,
      outerExpandedItemHeight: 350,
      outerItemHeight: 0,
      rowGap: 0,
    });
    expect(normalizeParameters(parameters, 100)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 250,
      expandedItemHeight: 350,
      itemHeight: 100,
      outerExpandedItemHeight: 450,
      outerItemHeight: 200,
      rowGap: 100,
    });
    expect(normalizeParameters(parameters, 101)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 250,
      expandedItemHeight: 350,
      itemHeight: 100,
      outerExpandedItemHeight: 450,
      outerItemHeight: 200,
      rowGap: 100,
    });
    expect(normalizeParameters(parameters, 199)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 250,
      expandedItemHeight: 350,
      itemHeight: 100,
      outerExpandedItemHeight: 450,
      outerItemHeight: 200,
      rowGap: 100,
    });
    expect(normalizeParameters(parameters, 200)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 150,
      expandedItemHeight: 350,
      itemHeight: 200,
      outerExpandedItemHeight: 550,
      outerItemHeight: 400,
      rowGap: 200,
    });
    expect(normalizeParameters(parameters, 500)).toStrictEqual({
      columnGap: 10,
      expandedExtraHeight: 150,
      expandedItemHeight: 350,
      itemHeight: 200,
      outerExpandedItemHeight: 550,
      outerItemHeight: 400,
      rowGap: 200,
    });

    expect(normalizeParameters({ rowGap: 0, columnGap: 100, itemHeight: 200 }, 500)).toStrictEqual({
      rowGap: 0,
      columnGap: 100,
      itemHeight: 200,
      expandedExtraHeight: 150,
      expandedItemHeight: 350,
      outerExpandedItemHeight: 350,
      outerItemHeight: 200,
    });

    expect(normalizeParameters({ rowGap: { '100': 100, 200: 500 } }, 10)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 450,
      outerItemHeight: 250,
      rowGap: 100,
    });
  });

  it("should handle corner cases with column' count", () => {
    expect(normalizeColumnsCount({ '0px': 11, a: 101 }, 500)).toStrictEqual(11);

    // @ts-ignore
    expect(normalizeColumnsCount({ a: 100 }, 500)).toStrictEqual(0);

    // @ts-ignore
    expect(normalizeColumnsCount(undefined, 500)).toStrictEqual(0);

    // @ts-ignore
    expect(normalizeColumnsCount(null, 500)).toStrictEqual(0);

    // @ts-ignore
    expect(normalizeColumnsCount({ '100': null }, 500)).toStrictEqual(0);
  });

  it('should handle corner cases with parameters', () => {
    expect(normalizeParameters({ rowGap: { '0px': 11, a: 101 } }, 500)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 361,
      outerItemHeight: 161,
      rowGap: 11,
    });

    // @ts-ignore
    expect(normalizeParameters({ a: { a: 100 } }, 500)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 370,
      outerItemHeight: 170,
      rowGap: 20,
    });

    expect(normalizeParameters({ rowGap: { a: 100 } }, 500)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 370,
      outerItemHeight: 170,
      rowGap: 20,
    });

    expect(normalizeParameters(undefined, 500)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 370,
      outerItemHeight: 170,
      rowGap: 20,
    });

    // @ts-ignore
    expect(normalizeParameters(null, 500)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 370,
      outerItemHeight: 170,
      rowGap: 20,
    });

    // @ts-ignore
    expect(normalizeParameters({ rowGap: null }, 500)).toStrictEqual({
      columnGap: 20,
      expandedExtraHeight: 200,
      expandedItemHeight: 350,
      itemHeight: 150,
      outerExpandedItemHeight: 370,
      outerItemHeight: 170,
      rowGap: 20,
    });
  });
});
