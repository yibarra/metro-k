import type { GridContextProps } from '../../providers/GridProvider/interfaces'
import type { LayersContextProps } from '../../providers/LayersProvider/interfaces'

export interface LayerProps
  extends
    Partial<GridContextProps>,
    Partial<LayersContextProps> {
  active?: boolean
  index: number
  layer: any
  getCell: any
  remove?: boolean
  updateLayer: any
}
