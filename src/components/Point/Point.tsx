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
  active,
  currentPoint,
  index,
  setCurrentPoint,
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
        draggable={active}
        x={x}
        y={y}
        radius={size}
        fill="#FFFFFF"
        stroke={(isDragging || currentPoint === index) && active  ? '#777777' : '#222222' }
        strokeWidth={2}
        onClick={() => {
          if (!active) {
            return false
          }

          setCurrentPoint(currentPoint === index ? null : index)
        }}
        onDragStart={() => {
          if (!active) {
            return false
          }

          setCurrentPoint(index)
          setIsDragging(true)
        }}
        onDragMove={({ evt }) => {
          if (!active) {
            return false
          }

          updateLayerPoint(
            {
              x: evt.clientX,
              y: evt.clientY,
            }, index
          )}
        }
        onDragEnd={({ evt }) => {
          if (!active) {
            return false
          }

          setIsDragging(false)

          updateLayerPoint(
            {
              x: evt.clientX,
              y: evt.clientY,
            }, index
          )}
        }
      />
    </>
  )
}

export default Point
