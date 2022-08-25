import type { GridProviderProps } from '../../../providers/GridProvider/interfaces'
import type { MainContextProps } from '../../../providers/MainProvider/interfaces'
import type { PointTypePosition } from '../../Point/interfaces'
import type { LayerProps } from '../interfaces'

export interface LayerPointsProps
  extends
    Partial<LayerProps>,
    Partial<GridProviderProps>,
    Partial<MainContextProps> {
  currentPoint: number
  isDragging: boolean
  deleteLayerPoint: any
  newPoint: PointTypePosition
  points: any
  properties: Record<string, string | number>
  remove: boolean
  setIsDragging(val: boolean): void
  setNewPoint(val: PointTypePosition): void
  setCurrentPoint(index: number): void
}
