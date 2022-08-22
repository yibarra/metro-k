import type { MainContextProps } from '../../../providers/MainProvider/interfaces'

export interface StageProps extends Partial<MainContextProps> {
  size: {
    height: number
    width: number
  }
}