import type { GridContextProps } from '../../providers/GridProvider/interfaces'
import type { LayersContextProps } from '../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../Point/interfaces'

export interface LayerProps
  extends Partial<GridContextProps>, Partial<LayersContextProps> {
  active?: boolean
  index: number
  layer: any
  points: PointTypePosition[]
}
