import type { CSSProperties } from 'react';
import type { Grid, Item } from './Grid';

export interface ExpandableGridParameters {
  rowGap: number;
  columnGap: number;
  itemHeight: number;
  expandedItemHeight: number;
}

type ItemPosition = Pick<CSSProperties, 'top' | 'left' | 'right'>;

const DEFAULT_PARAMETERS: ExpandableGridParameters = {
  rowGap: 20,
  columnGap: 20,
  itemHeight: 150,
  expandedItemHeight: 350,
};

interface NormalizedParameters extends ExpandableGridParameters {
  outerItemHeight: number;
  outerExpandedItemHeight: number;
  expandedExtraHeight: number;
}

export class GridStyles {
  private readonly parameters: NormalizedParameters;

  constructor(
    private readonly grid: Grid,
    parameters: Partial<ExpandableGridParameters>
  ) {
    this.parameters = this.normalizeParameters(parameters);
  }

  public getGridStyles(): CSSProperties {
    return {
      position: 'relative',
      marginTop: -this.parameters.rowGap / 2,
      marginLeft: -this.parameters.columnGap / 2,
      width: `calc(100% + ${this.parameters.columnGap}px)`,
      height: this.calculateGridHeight(),
    };
  }

  public getItemStyles(item: Item): CSSProperties {
    return Object.assign(
      {
        position: 'absolute',
        marginTop: this.parameters.rowGap / 2,
        marginBottom: this.parameters.rowGap / 2,
        marginLeft: this.parameters.columnGap / 2,
        marginRight: this.parameters.columnGap / 2,
        height: this.grid.isItemExpanded(item) ? this.parameters.expandedItemHeight : this.parameters.itemHeight,
      } as CSSProperties,
      this.calculateItemPosition(item)
    );
  }

  private normalizeParameters(parameters: Partial<ExpandableGridParameters>): NormalizedParameters {
    const normalized: NormalizedParameters = Object.assign(
      DEFAULT_PARAMETERS,
      {
        outerItemHeight: DEFAULT_PARAMETERS.rowGap + DEFAULT_PARAMETERS.itemHeight,
        outerExpandedItemHeight: DEFAULT_PARAMETERS.rowGap + DEFAULT_PARAMETERS.expandedItemHeight,
        expandedExtraHeight: DEFAULT_PARAMETERS.expandedItemHeight - DEFAULT_PARAMETERS.itemHeight,
      },
      parameters
    );

    normalized.outerItemHeight = normalized.itemHeight + normalized.rowGap;
    normalized.outerExpandedItemHeight = normalized.expandedItemHeight + normalized.rowGap;

    return normalized;
  }

  private calculateGridHeight(): number {
    let rowsCount = Math.ceil(this.grid.itemsCount / this.grid.columnsCount);
    let itemsHeight = rowsCount * this.parameters.outerItemHeight;
    let correctionHeight = this.parameters.rowGap / 2;

    if (!this.grid.hasExpanded) {
      return itemsHeight - correctionHeight;
    }

    // When only a single item occupies the last row, the shifted grid row's count remains identical to the default layout.
    if (this.grid.columnsCount !== 1 && this.grid.itemsCount % this.grid.columnsCount !== 1) {
      itemsHeight += this.parameters.outerItemHeight;
    }

    return itemsHeight + this.parameters.expandedExtraHeight - correctionHeight;
  }

  private calculateItemPosition(item: Item): ItemPosition {
    let top = item.y * this.parameters.outerItemHeight;

    if (item.isUnderExpanded(this.grid.expandedItem)) {
      top += this.parameters.expandedExtraHeight;
    }

    const res: ItemPosition = {
      left: 0,
      right: 0,
      top: top,
    };

    if (this.grid.isItemExpanded(item)) {
      return res;
    }

    res.left = `${item.x * (100 / this.grid.columnsCount)}%`;
    res.right = `${Math.abs(item.x - (this.grid.columnsCount - 1)) * (100 / this.grid.columnsCount)}%`;

    return res;
  }
}
