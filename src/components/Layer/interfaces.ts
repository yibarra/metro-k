import type { GridContextProps } from '../../providers/GridProvider/interfaces'
import type { LayersContextProps } from '../../providers/LayersProvider/interfaces'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'

export interface LayerProps
  extends
    Partial<GridContextProps>,
    Partial<LayersContextProps>,
    Partial<MainContextProps> {
  active?: boolean
  index: number
  layer: any
  getCell: any
  setIsDragging(val: boolean): void
  updateLayer: any
}
