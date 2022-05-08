export type SizeType = {
  height: number
  width: number
}

export interface MainContextProps {
  animate: boolean
  loaded: boolean
  setAnimate(val: boolean): void
  setLoaded(val: boolean): void
  size: SizeType
}