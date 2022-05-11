import React from 'react'
import { Group } from 'react-konva'

import Line from '../Line'
import Point from '../Point'

// layer
const Layer: React.FC<any> = ({ points, size }) => {
  // color
  // name
  // properties: line - stroke, color, type: dash, linejoin, linecap ... point stroke, color

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          <Line points={Object.values(points)} strokeWidth={size} />

          {points.map((point: any, index: number) =>
            <Point key={index} size={size} {...point} />)}
        </>
      }
    </Group>
  )
}

export default Layer