import React, { useContext } from 'react'

import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import * as S from './styles'

const Controls: React.FC<any> = () => {
  const { enable, setEnable } = useContext(LayersContext)

  return (
    <S.ControlsDiv>
      <input type="checkbox" value={enable.toString()} onChange={() => setEnable(!enable)} />
    </S.ControlsDiv>
  )
}

export default Controls
