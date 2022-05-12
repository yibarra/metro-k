import React, { useState } from 'react'
import { Circle } from 'react-konva'
import ToolTip from '../ToolTip'

// point
// position
// color
// type - null - empty - circle
// drag
// collision

// point
const Point: React.FC<any> = ({
  index,
  size = 5,
  x = 0,
  y = 0,
  updateLayerPoint,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)

  // render
  return (
    <>
      <ToolTip x={x} y={y - (50 + size)} />

      <Circle
        draggable
        x={x}
        y={y}
        radius={size}
        fill="#FFFFFF"
        stroke={isDragging ? '#777777' : '#222222' }
        strokeWidth={2}
        onDragStart={() => setIsDragging(true)}
        onDragMove={({ evt }) => {
          updateLayerPoint(
            {
              x: Math.round(evt.clientX / size) * size,
              y: Math.round(evt.clientY / size) * size,
            }, index
          )}
        }
        onDragEnd={({ evt }) => {
          setIsDragging(false)

          updateLayerPoint(
            {
              x: Math.round(evt.clientX / size) * size,
              y: Math.round(evt.clientY / size) * size,
            }, index
          )}
        }
      />
    </>
  )
}

export default Point
