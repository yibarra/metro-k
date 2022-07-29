import React, { useEffect, useRef } from 'react'
import { Circle } from 'react-konva'

import { WithPoint } from './withPoint'
import ToolTip from '../ToolTip'

// point
const Point: React.FC<any> = ({
  active,
  currentPoint,
  handlerEvents,
  index,
  isDragging,
  properties,
  setClickPoint,
  x = 0,
  y = 0,
}) => {
  const element = useRef<any>(null)

  // use effect
  useEffect(() => {
    if (typeof element.current.to !== 'undefined') {
      element.current.to({ ...properties })
    }
  }, [properties])

  // render
  return (
    <>
      {((currentPoint === index && active) || isDragging) && <ToolTip x={x} y={y - (50 + properties.radius)} />}

      <Circle
        {...properties}
        draggable={active}
        ref={element}
        onClick={setClickPoint}
        onDragStart={handlerEvents}
        onDragMove={handlerEvents}
        onDragEnd={handlerEvents}
        stroke={(isDragging || currentPoint === index) ? properties.active : properties.stroke }
        x={x}
        y={y}
      />
    </>
  )
}

export default WithPoint(Point)
