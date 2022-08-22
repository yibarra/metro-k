import { ReactNode } from 'react'
import { PointTypePosition } from '../../components/Point/interfaces'

export interface LayerPropertiesProps {
  active?: string
  dash?: number[]
  fill: string
  lineCap?: string
  lineJoin?: string
  radius?: number
  stroke?: string
  strokeWidth?: number
  tension?: number
}

export interface LayerProps {
  id: number
  name: string
  currentPoint: number
  lineProperties: LayerPropertiesProps,
  pointsProperties: LayerPropertiesProps,
  points: PointTypePosition[]
}

export interface LayersContextProps {
  createLayer(layer: any): void
  createLayerPoint: any
  current: number
  deleteLayer(index: number): void
  layers: any
  deleteLayerPoint(index: number): void
  setCurrent(current: number): void
  updateLayer(index: number, data: Record<string, unknown>): void
  updateLayerPoint: any
}

export interface LayersProvidersProps {
  children: ReactNode
}