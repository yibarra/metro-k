import React, { useState } from 'react'
import { Group } from 'react-konva'

import Line from '../Line'
import Point from '../Point'

// layer
const Layer: React.FC<any> = ({
  active,
  index,
  layer,
  points,
  getCell,
  updateLayer,
  updateLayerPoint,
  fixPositionCenter,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // color
  // name
  // properties: line - stroke, color, type: dash, linejoin, linecap ... point stroke, color

  const setCurrentPoint = (value: number) => {
    updateLayer(index, { currentPoint: value })
  }

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          <Line
            active={active}
            isDragging={isDragging}
            points={Object.values(points.map((item) => [ item.x, item.y ]))}
            properties={layer.lineProperties}
          />

          {points.map((point: any, index: number) =>
            <Point
              {...point}
              active={active}
              currentPoint={layer.currentPoint}
              index={index}
              isDragging={isDragging}
              key={index}
              getCell={getCell}
              properties={{ ...layer.pointsProperties, ...point.properties }}
              setIsDragging={setIsDragging}
              setCurrentPoint={setCurrentPoint}
              updateLayerPoint={updateLayerPoint}
              fixPositionCenter={fixPositionCenter}
            />
          )}
        </>
      }
    </Group>
  )
}

export default Layer