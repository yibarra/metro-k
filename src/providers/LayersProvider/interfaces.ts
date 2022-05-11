import { ReactNode } from 'react'

export interface LayersContextProps {
  createLayer(layer: any): void
  current: number
  deleteLayer(index: number): void
  layers: any
  updateLayer(index: number, data: Record<string, unknown>): void
  updateLayerPoints(point: any): void
  setCurrent(current: number): void
  setEnable(enable: boolean): void
}

export interface LayersProvidersProps {
  children: ReactNode
}