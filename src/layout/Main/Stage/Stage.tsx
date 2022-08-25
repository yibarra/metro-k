import React, { useContext } from 'react'
import { Stage as StageKonva, Layer as LayerKonva } from 'react-konva'

import Grid from '../../../components/Grid'
import Layer from '../../../components/Layer'
import { LayersContext } from '../../../providers/LayersProvider/LayersProvider'
import { GridContext } from '../../../providers/GridProvider/GridProvider'

import type { GridContextProps } from '../../../providers/GridProvider/interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { StageProps } from './interfaces'
import type { LayerProps, LayersContextProps } from '../../../providers/LayersProvider/interfaces'

// stage
const Stage: React.FC<StageProps> = ({
  curve,
  isDragging = false,
  size,
  remove,
  setIsDragging,
}) => {
  const {
    createLayerPoint,
    deleteLayerPoint,
    current,
    layers,
    updateLayer,
    updateLayerPoint,
  } = useContext<LayersContextProps>(LayersContext)

  const {
    createGridBoxes,
    getCell,
    fixPositionCenter,
  } = useContext<GridContextProps>(GridContext)

  // create point layer active
  const createPoint = (event: KonvaEventObject<MouseEvent>) => {
    event.cancelBubble = true

    const position = Number(layers[current].currentPoint) + 1
    const values = getCell(event.evt.clientX, event.evt.clientY, size.width, size.height)
    
    if (values) {
      createLayerPoint(
        position,
        {
          x: values[0] + values[2] / 2,
          y: values[1] + values[2] / 2,
          position,
        }
      )
    }
  }

  // render
  return (
    <StageKonva
      className="stage"
      tabIndex={0}
      height={size.height}
      onClick={createPoint}
      width={size.width}
    >
      <LayerKonva>
        <Grid createGridBoxes={createGridBoxes} {...size} />

        {Array.isArray(layers) && layers.map((layer: LayerProps, index: number) =>
          <Layer
            active={current === index}
            curve={curve}
            deleteLayerPoint={deleteLayerPoint}
            fixPositionCenter={fixPositionCenter}
            getCell={getCell}
            isDragging={isDragging}
            index={index}
            layer={layer}
            key={index}
            remove={remove}
            setIsDragging={setIsDragging}
            updateLayer={updateLayer}
            updateLayerPoint={updateLayerPoint}
          />
        )}
      </LayerKonva>
    </StageKonva>
  )
}

export default Stage
