import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../../Point/interfaces'

export interface LayerLineProps {
  active?: boolean
  isDragging?: boolean
  newPoint: PointTypePosition
  layer: LayerProps
  points: PointTypePosition[]
}
