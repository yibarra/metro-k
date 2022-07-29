export interface WithPointProps {
  active?: boolean
  currentPoint?: number
  isDragging?: boolean
  index: number
  properties: any
  setCurrentPoint(index: number): void
  updateLayerPoint(props: any, index: number): void
}

export interface PointProps {
  any?: any
}