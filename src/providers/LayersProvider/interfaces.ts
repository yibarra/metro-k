import { ReactNode } from 'react'

export interface LayersContextProps {
  createLayer(layer: any): void
  createLayerPoint: any
  current: number
  currentPoint: number;
  deleteLayer(index: number): void
  enable: boolean
  layers: any
  setCurrent(current: number): void
  setCurrentPoint(current: number): void
  setEnable(enable: boolean): void
  updateLayer(index: number, data: Record<string, unknown>): void
  updateLayerPoint: any
}

export interface LayersProvidersProps {
  children: ReactNode
}