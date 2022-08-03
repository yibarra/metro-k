import React from 'react'
import ComboBox from '../../ComboBox'

import * as S from './styles'

// selector dash item
const SelectorDashItem: React.FC<any> = ({
  max,
  min,
  onChangeDash,
  type = 'default',
  value,
}) => {
  // on change value
  const onChangeValue = (value: number) => {
    onChangeDash(value, type)
  }
  
  // render
  return (
    <ComboBox max={max} min={min} callback={onChangeValue} value={value}>
      <S.SelectorDashItemP>{value}</S.SelectorDashItemP>
    </ComboBox>
  )
}

export default SelectorDashItem
