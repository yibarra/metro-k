import React from 'react'
import { Group } from 'react-konva'

import Line from '../Line'
import Point from '../Point'

// layer
const Layer: React.FC<any> = ({
  active,
  currentPoint,
  points,
  setCurrentPoint,
  size,
  updateLayerPoint,
}) => {
  // color
  // name
  // properties: line - stroke, color, type: dash, linejoin, linecap ... point stroke, color

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          <Line points={Object.values(points.map((item) => {
            return [ item.x, item.y ]
          }))} strokeWidth={size} />

          {points.map((point: any, index: number) =>
            <Point
              active={active}
              currentPoint={currentPoint}
              index={index}
              key={index}
              setCurrentPoint={setCurrentPoint}
              size={size / 2}
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