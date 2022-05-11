import React from 'react'
import { Circle } from 'react-konva'

// point
// position
// color
// type - null - empty - circle
// drag
// collision

// point
const Point: React.FC<any> = ({
  size = 5,
  x = 0,
  y = 0,
}) => {
  // render
  return (
    <>
      <Circle
        x={x}
        y={y}
        radius={size}
        fill="#FFFFFF"
        stroke="#333333"
        strokeWidth={2}
      />
    </>
  )
}

export default Point
