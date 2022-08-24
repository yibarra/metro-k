import React, { useContext } from 'react'
import { LayersContextProps } from '../../providers/LayersProvider/interfaces'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'

import type { MenuPointProps } from './interfaces'
import * as S from './styles'

const MenuPoint: React.FC<MenuPointProps> = ({
  isDragging,
}) => {
  const { layers, current } = useContext<LayersContextProps>(LayersContext)
  const layer = layers[current]

  if (!layer) {
    return null
  }

  const point = layer.points[layer.currentPoint]

  console.info(point)

  // render
  return (
    <S.MenuPointDiv
      style={{ 
        opacity: !isDragging ? 1 : 0,
        left: point.x,
        top: point.y
      }}
    >
      <button>add text</button>
      <button>add icon</button>
    </S.MenuPointDiv>
  )
}

export default MenuPoint;