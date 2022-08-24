import React from 'react'

export type SizeType = {
  height: number
  width: number
}

export interface MainContextProps {
  animate: boolean
  data: any
  enable: boolean
  remove: boolean
  loaded: boolean
  isDragging: boolean
  setAnimate(val: boolean): void
  setData(val: any): void
  setIsDragging(val: boolean): void
  setLoaded(val: boolean): void
  setEnable(enable: boolean): void
  setRemove(val: boolean): void
  size: SizeType
}

export interface MainProviderProps {
  children: React.ReactNode
}
