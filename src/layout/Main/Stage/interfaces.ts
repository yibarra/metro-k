import type { MainContextProps } from '../../../providers/MainProvider/interfaces'

export interface StageProps
  extends Partial<MainContextProps> {
  setIsDragging(val: boolean): void
  size: {
    height: number
    width: number
  }
}