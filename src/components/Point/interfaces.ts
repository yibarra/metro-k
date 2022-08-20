import type { GridContextProps } from "../../providers/GridProvider/interfaces"

export type PointTypePosition = {
  x: number
  y: number
  position: number
}

export interface WithPointProps extends Partial<GridContextProps> {
  active?: boolean
  currentPoint?: number
  height: number
  index: number
  isDragging?: boolean
  position: number
  properties: any
  setNewPoint(point: PointTypePosition): void
  setCurrentPoint(index: number): void
  setIsDragging(val: boolean): void
  setPositionPoint(x: number, y: number, position: number): void
  setClickPoint(): void
  width: number
  updateLayerPoint(props: any, index: number): void
  x: number
  y: number
}


export interface PointProps {
  any?: any
}