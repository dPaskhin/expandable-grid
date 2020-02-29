export interface ICoord {
    x: number
    y: number
}

export interface IItem {
    id: number
    coord: ICoord
    expanded?: boolean
    underExpanded?: boolean
}

export interface IPosition {
    top: string | number
    left: string | number
    right: string | number
}
