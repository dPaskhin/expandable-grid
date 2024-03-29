import type { CSSProperties } from 'react';
import type { Grid, Item } from './Grid';
import type { NormalizedParameters } from './normalizeParameters';

type ItemPosition = Pick<CSSProperties, 'top' | 'left' | 'right'>;

export class GridStyles {
  constructor(
    private readonly grid: Grid,
    private readonly parameters: NormalizedParameters
  ) {}

  public getGridStyles(): CSSProperties {
    return {
      position: 'relative',
      marginTop: -this.parameters.rowGap / 2,
      marginLeft: -this.parameters.columnGap / 2,
      width: `calc(100% + ${this.parameters.columnGap}px)`,
      height: this.calculateGridHeight(),
      willChange: 'transform',
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
