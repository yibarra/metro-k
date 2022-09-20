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
        left: point instanceof Object ? point.x : 0,
        top: point instanceof Object ? point.y : 0
      }}
    >
      <button>cc</button>
      <button>at</button>
      <button>ai</button>
      <button>h - v</button>
    </S.MenuPointDiv>
  )
}

export default MenuPoint;