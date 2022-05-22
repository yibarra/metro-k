import React, { useContext } from 'react'

import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import ControlsLayers from './ControlsLayers'
import * as S from './styles'

const Controls: React.FC<any> = () => {
  const { createLayer, enable, setEnable } = useContext(LayersContext)

  return (
    <S.ControlsDiv>
      <input type="checkbox" defaultValue={enable.toString()} onChange={() => setEnable(!enable)} />
      <button onClick={() => {
        createLayer({
          name: 'New Layer',
          currentPoint: 0,
          lineProperties: {
            color: '#FF88FF',
            border: '#222333'
          },
          pointsProperties: {
            active: '#341341',
            color: '#209479',
            border: '#987443'
          },
          points: [
            { x: 110, y: 120, properties: { color: '#222', border: '#F33FAA' } },
            { x: 150, y: 350, properties: null },
          ]
        })
      }}>create layer</button>

      <ControlsLayers />
    </S.ControlsDiv>
  )
}

export default Controls
