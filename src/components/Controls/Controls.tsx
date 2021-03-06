import React, { useContext } from 'react'

import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import ControlsLayers from './ControlsLayers'
import * as S from './styles'

const Controls: React.FC<any> = () => {
  const { enable, setEnable } = useContext(LayersContext)

  return (
    <S.ControlsDiv>
      <input type="checkbox" defaultValue={enable.toString()} onChange={() => setEnable(!enable)} />

      <ControlsLayers />
    </S.ControlsDiv>
  )
}

export default Controls
