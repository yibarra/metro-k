import React from 'react'
import { Group } from 'react-konva'

import Line from '../Line'
import Point from '../Point'

// layer
const Layer: React.FC<any> = ({
  active,
  index,
  layer,
  points,
  updateLayer,
  updateLayerPoint,
}) => {
  // color
  // name
  // properties: line - stroke, color, type: dash, linejoin, linecap ... point stroke, color

  const setCurrentPoint = (value: number) => {
    console.info(value)
    updateLayer(index, { currentPoint: value })
  }

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          <Line
            index={index}
            points={Object.values(points.map((item) => {
              return [ item.x, item.y ]
            }))}
            properties={layer.lineProperties}
          />

          {points.map((point: any, index: number) =>
            <Point
              active={active}
              currentPoint={layer.currentPoint}
              index={index}
              key={index}
              properties={{ ...layer.pointsProperties, ...point.properties }}
              setCurrentPoint={setCurrentPoint}
              updateLayerPoint={updateLayerPoint}
              {...point}
            />
          )}
        </>
      }
    </Group>
  )
}

export default Layer