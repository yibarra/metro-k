import React from 'react'

import * as S from './styles'

const Dash: React.FC<any> = ({ dash, onChange }) => {
  return (
    <S.DashDiv>
      <S.DashInput
        defaultValue="0"
        name="dash-0"
        type="number"
        onChange={(e) => onChange([e.target.value, dash[1]])}
      />

      <S.DashInput
        defaultValue="0"
        name="dash-1"
        type="number"
        onChange={(e) => onChange([dash[0], e.target.value])}
      />
    </S.DashDiv>
  )
}

export default Dash
