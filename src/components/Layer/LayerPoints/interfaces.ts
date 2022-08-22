import type { GridProviderProps } from '../../../providers/GridProvider/interfaces'
import type { AxisType } from '../../Grid/interfaces'
import type { PointTypePosition } from '../../Point/interfaces'
import type { LayerProps } from '../interfaces'

export interface LayerPointsProps
  extends Partial<LayerProps>, Partial<GridProviderProps> {
  currentPoint: number
  isDragging: boolean
  deleteLayerPoint: any
  newPoint: PointTypePosition
  getCell(x: number, y: number, width: number, height: number ): AxisType
  points: any
  properties: Record<string, string | number>
  remove: boolean
  setIsDragging(val: boolean): void
  setNewPoint(val: PointTypePosition): void
  setCurrentPoint(index: number): void
}
