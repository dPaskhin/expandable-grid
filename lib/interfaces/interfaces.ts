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

interface IMediaWidth {
    min: number
    max: number
}

export interface IMediaColumn {
    windowWidth: IMediaWidth
    columnsCount: number
}

export interface IMediaHeight {
    windowWidth: IMediaWidth
    height: number
}

export interface IMediaGap {
    windowWidth: IMediaWidth
    gap: number
}
