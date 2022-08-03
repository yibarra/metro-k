import React from 'react'

import * as S from './styles'

// selector dash
const SelectorDash: React.FC<any> = ({ index, layer, updateLayer }) => {
  // render
  return (
    <S.SelectorDashDiv>
      <input
        name="dash0"
        type="number"
        defaultValue="0"
        onChange={(e) => updateLayer(index, { pointsProperties: {
          ...layer.pointsProperties,
          dash: [e.target.value, layer.pointsProperties.dash[1]]
        }})}
      />

      <input
        name="dash1"
        type="number"
        defaultValue="0"
        onChange={(e) => updateLayer(index, { pointsProperties: {
          ...layer.pointsProperties,
          dash: [layer.pointsProperties.dash[0], e.target.value]
        }})}
      />
    </S.SelectorDashDiv>
  )
}

export default SelectorDash
