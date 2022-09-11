import React, { useState } from 'react'
import { Group } from 'react-konva'

import LayerLine from './LayerLine'
import LayerPoints from './LayerPoints'
import LineCurve from '../LineCurve'
import { getPointByPosition } from '../../providers/LayersProvider/LayersProviderTools'
import type { LayerProps } from './interfaces'
import type { PointTypePosition } from '../Point/interfaces'

// layer
const Layer: React.FC<LayerProps> = ({
  active,
  createLayerCurve,
  curve = false,
  deleteLayerPoint,
  getCell,
  index,
  isDragging = false,
  layer,
  remove = false,
  setIsDragging,
  updateLayer,
  updateLayerCurvePoint,
  updateLayerPoint,
}) => {
  const {
    curves,
    currentPoint,
    lineProperties,
    points,
    pointsProperties,
  } = layer

  const [newPoint, setNewPoint] = useState<PointTypePosition>({ x: 0, y: 0, position: 0 })

  // set current point
  const setCurrentPoint = (value: number): void => {
    updateLayer(index, { currentPoint: value })
  }

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          {Array.isArray(curves) && curves.map((curve: any, index: number) => (
            <LineCurve
              active={active}
              curve={curve?.curve}
              pointInit={getPointByPosition(points, curve?.pointInit)}
              pointEnd={getPointByPosition(points, curve?.pointEnd)}
              isDragging={isDragging}
              getCell={getCell}
              index={index}
              key={index}
              properties={lineProperties}
              setIsDragging={setIsDragging}
              updateLayerCurvePoint={updateLayerCurvePoint}
            />)
          )}
          
          <LayerLine
            active={active}
            curves={curves}
            currentPoint={currentPoint}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            points={points}
            properties={lineProperties}
          />

          <LayerPoints
            active={active}
            curve={curve}
            createLayerCurve={createLayerCurve}
            currentPoint={currentPoint}
            deleteLayerPoint={deleteLayerPoint}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            points={points}
            properties={pointsProperties}
            remove={remove}
            setCurrentPoint={setCurrentPoint}
            setIsDragging={setIsDragging}
            setNewPoint={setNewPoint}
            updateLayerPoint={updateLayerPoint}
          />
        </>
      }
    </Group>
  )
}

export default Layer