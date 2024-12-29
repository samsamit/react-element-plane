
export interface PlaneState {
    positionOffset: PlanePosition
    zoomLevel: number
}

export interface PlanePosition {
    x: number
    y: number
}

export const Z_LEVELS = {
    dragging: 100,
    default: 1,
}