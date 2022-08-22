import type { LayerProps } from '../../../providers/LayersProvider/interfaces'
import type { PointTypePosition } from '../../Point/interfaces'

export interface LayerLineProps extends Partial<LayerProps> {
  active?: boolean
  isDragging?: boolean
  newPoint: PointTypePosition
  points: PointTypePosition[]
  getCell: any
  properties: Record<string, string | number>  
}
