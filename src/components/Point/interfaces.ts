export interface WithPointProps {
  active?: boolean
  currentPoint?: number
  isDragging?: boolean
  index: number
  getCell: any
  properties: any
  setCurrentPoint(index: number): void
  setIsDragging(val: boolean): void
  updateLayerPoint(props: any, index: number): void
  fixPositionCenter(value: number, sizeAxis: number, axis: number, sizeBox: number): number
}

export interface PointProps {
  any?: any
}