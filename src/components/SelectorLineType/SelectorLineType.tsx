import React, { useState } from 'react'
import ComboBox from '../ComboBox'

import type { SelectorLineTypeProps } from './interfaces'
import * as S from './styles'

// selector line type
const SelectorLineType: React.FC<SelectorLineTypeProps> = ({
  defaultValue = 0,
  items,
  onChangeValue,
  variant = 'join'
}) => {
  const [current, setCurrent] = useState<number>(defaultValue)

  // render
  return (
    <S.SelectorLineTypeDiv>
      <ComboBox
        callback={(value: any) => {
          onChangeValue(items[current].name)
          setCurrent(value)
        }}
        max={items.length - 1}
        min={0}
        value={current}
      >
        {items.map(({ name }: any, index: number) =>
          <S.SelectorLineTypeItemDiv active={current === index} key={index}>
            {(variant === 'join')
              ? <S.SelectorLineTypeIconJoin typeLine={name}>
                  <span></span>
                </S.SelectorLineTypeIconJoin>
              : <S.SelectorLineTypeIconCap typeLine={name} />
            }
          </S.SelectorLineTypeItemDiv>
        )}
      </ComboBox>
    </S.SelectorLineTypeDiv>
  )
}

export default SelectorLineType