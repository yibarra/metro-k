import React, { useContext } from 'react'
import nextId from 'react-id-generator'

import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import ControlsLayers from './ControlsLayers'
import * as S from './styles'

const Controls: React.FC<any> = () => {
  const { data, enable, remove, setData } = useContext(MainContext)
  const { createLayer, layers } = useContext(LayersContext)

  return (
    <S.ControlsDiv>
      <p>{enable ? 'ENABLED' : 'DISABLED'}</p> -
      <p>{remove ? 'REMOVE ENABLED' : 'REMOVE DISABLED'}</p>

      <button onClick={() => {
        setData({ ...data, layers })
      }}>
        Save local storage
      </button>

      <button onClick={() => {
        createLayer({
          id: nextId('layer-'),
          name: `New Layer ${layers.length}`,
          currentPoint: 0,
          lineProperties: {
            border: '#222333',
            dash: [0, 0],
            lineCap: 'butt',
            lineJoin: 'miter',
            stroke: '#FF844F',
            strokeWidth: 2,
            tension: 0,
          },
          pointsProperties: {
            active: '#341341',
            dash: [5, 5],
            fill: '#987443',
            lineCap: 'butt',
            lineJoin: 'miter',
            radius: 5,
            stroke: '#209479',
            strokeWidth: 2,
          },
          points: []
        })
      }}>create layer</button>

      <ControlsLayers />
    </S.ControlsDiv>
  )
}

export default Controls
