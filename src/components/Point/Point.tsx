import React, { useEffect, useRef } from 'react'
import { Circle } from 'react-konva'

import { WithPoint } from './withPoint'
import ToolTip from '../ToolTip'
import { KonvaEventObject } from 'konva/lib/Node'

// point
const Point: React.FC<any> = ({
  active,
  currentPoint,
  handlerEvents,
  getCell,
  index,
  isDragging,
  properties,
  setClickPoint,
  setPositionPoint,
  setIsDragging,
  x = 0,
  y = 0,
}) => {
  const element = useRef<any>(null)

  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    // to() is a method of `Konva.Node` instances
    

    console.info('end')

    const point = getCell(event.evt.clientX, event.evt.clientY)

    element.current.to({
      x: point[0] + point[2] / 2,
      y: point[1] + point[2] / 2,
      duration: 0.4,
    })

    setPositionPoint(event.evt)
  }

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
        onDragEnd={onDragEndPoint}
        stroke={(isDragging || currentPoint === index) ? properties.active : properties.stroke }
        x={x}
        y={y}
      />
    </>
  )
}

export default WithPoint(Point)
