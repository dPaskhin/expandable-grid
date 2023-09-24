interface Coordinates {
  x: number;
  y: number;
}

export class Item {
  public x = 0;
  public y = 0;

  public constructor(public readonly index: number) {}

  public isUnderExpanded(expandedItem: Item | undefined): boolean {
    if (!expandedItem) {
      return false;
    }

    return this.y > expandedItem.y;
  }

  public updateCoordinates(columnsCount: number, expandedItemIndex?: number): void {
    const coordinates = this.calculateCoordinates(columnsCount, expandedItemIndex);
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  private calculateCoordinates(columnsCount: number, expandedItemIndex?: number): Coordinates {
    const base = this.calculateBaseCoordinates(columnsCount);

    if (expandedItemIndex === undefined) {
      return base;
    }

    const expandedItem = this.calculateBaseCoordinates(columnsCount, expandedItemIndex);

    return this.calculateShiftedCoordinates(base, expandedItem, columnsCount);
  }

  /**
   * Determines the item's default position in the grid.
   */
  private calculateBaseCoordinates(columnsCount: number, index = this.index): Coordinates {
    return { x: index % columnsCount, y: Math.floor(index / columnsCount) };
  }

  /**
   * Determines the item's position in the context of an expanded Grid item.
   */
  private calculateShiftedCoordinates(base: Coordinates, expandedItem: Coordinates, columnsCount: number): Coordinates {
    // Shift the x-coordinate of an expanded item to 0.
    if (expandedItem.x === base.x && expandedItem.y === base.y) {
      return { x: 0, y: expandedItem.y };
    }

    // Determines the positions of items within the same row as the expanded one.
    if (expandedItem.y === base.y) {
      return expandedItem.x > base.x
        ? // Items after expanded item only go down.
          { x: base.x, y: base.y + 1 }
        : // Item before expanded item go left and down.
          { x: base.x - 1, y: base.y + 1 };
    }

    // Determines the positions of items in rows following the expanded item's row.
    if (expandedItem.y < base.y) {
      return base.x === 0
        ? // Zero x-coordinate items go up and to the end of the row.
          { x: columnsCount - 1, y: base.y }
        : // Others go one step left and down.
          { x: base.x - 1, y: base.y + 1 };
    }

    // Items above the expanded item row don't change their position.
    return base;
  }
}

export class Grid {
  public readonly items: Item[] = [];

  private _expandedItemIndex?: number;

  public constructor(
    public readonly columnsCount: number,
    public readonly itemsCount: number,
    public readonly onItemExpandedChanged: () => void
  ) {
    this.items = this.createItems();
  }

  public get hasExpanded(): boolean {
    return this.expandedItemIndex !== undefined;
  }

  public get expandedItem(): Item | undefined {
    return this.expandedItemIndex !== undefined ? this.items[this.expandedItemIndex] : undefined;
  }

  public isItemExpanded(item: Item): boolean {
    return this.expandedItemIndex === item.index;
  }

  public expandItem(item: Item) {
    this.expandedItemIndex = item.index;
  }

  public collapseExpandedItem() {
    this.expandedItemIndex = undefined;
  }

  public toggleExpandedItem(item: Item): void {
    if (item === this.expandedItem) {
      this.collapseExpandedItem();
    } else {
      this.expandItem(item);
    }
  }

  private get expandedItemIndex() {
    return this._expandedItemIndex;
  }

  private set expandedItemIndex(index) {
    this._expandedItemIndex = index;
    this.onItemExpandedChanged();

    this.items.forEach((item) => item.updateCoordinates(this.columnsCount, index));
  }

  private createItems(): Item[] {
    return Array.from({ length: this.itemsCount }).map((_, index) => {
      const item = new Item(index);

      item.updateCoordinates(this.columnsCount, this.expandedItemIndex);

      return item;
    });
  }
}
