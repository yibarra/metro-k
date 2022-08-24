import React from 'react'

export type SizeType = {
  height: number
  width: number
}

export type SetOption = (val: boolean) => void

export interface MainContextProps {
  animate: boolean
  curve: boolean
  data: any
  enable: boolean
  remove: boolean
  loaded: boolean
  isDragging: boolean
  setAnimate: SetOption
  setCurve: SetOption
  setData(val: any): void
  setIsDragging: SetOption
  setLoaded: SetOption
  setEnable: SetOption
  setRemove: SetOption
  size: SizeType
}

export interface MainProviderProps {
  children: React.ReactNode
}
