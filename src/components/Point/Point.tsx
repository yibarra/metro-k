import React, { useEffect, useRef } from 'react'
import { Circle } from 'react-konva'

import { WithPoint } from './withPoint'
import ToolTip from '../ToolTip'
import { KonvaEventObject } from 'konva/lib/Node'
import { useState } from 'react'

// point
const Point: React.FC<any> = ({
  active,
  currentPoint,
  getCell,
  index,
  isDragging,
  properties,
  setClickPoint,
  setIsDragging,
  setPositionPoint,
  x = 0,
  y = 0,
}) => {
  const element = useRef<any>(null)
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  // on drag start point
  const onDragStartPoint = () => {
    setIsDragging(true)
  }

  // on grad point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    setXY({ x: event.evt.clientX, y: event.evt.clientY })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {    
    const point = getCell(event.evt.clientX, event.evt.clientY)

    if (active && point && element.current) {
      element.current.to({
        x: point[0] + point[2] / 2,
        y: point[1] + point[2] / 2,
        duration: 0.4,
      })
      
      setPositionPoint(event.evt)
      setIsDragging(false)
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
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
      {((currentPoint === index && active) || isDragging) &&
        <ToolTip x={x} y={y - (50 + properties.radius)} />}

      <Circle
        {...properties}
        draggable={active}
        ref={element}
        onClick={setClickPoint}
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        stroke={(isDragging || currentPoint === index) ? properties.active : properties.stroke }
        x={!isDragging ? x : xy.x}
        y={!isDragging ? y : xy.y}
      />
    </>
  )
}

export default WithPoint(Point)
