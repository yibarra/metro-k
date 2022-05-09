import React from 'react'
import { Circle } from 'react-konva'

// point
const Point: React.FC<any> = ({
  size = 10,
  x = 0,
  y = 0,
}) => {
  // render
  return (
    <Circle
      x={x}
      y={y}
      radius={size}
      fill="red"
      stroke="black"
      strokeWidth={4}
    />
  )
}

export default Point
