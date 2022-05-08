import { ReactNode } from 'react'

export type PositionType = {
  x: number
  y: number
}

export interface ZoomContextProps {
  position?: PositionType
  scale?: number
  setPosition(val: PositionType): void
  setScale(val: number): void
}

export interface ZoomProviderProps {
  children: ReactNode
}
