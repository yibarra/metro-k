import React, { useEffect, useRef, useState } from 'react'
import { Circle } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { WithPoint } from './withPoint'
import ToolTip from '../ToolTip'

// point
const Point: React.FC<any> = ({
  active,
  currentPoint,
  getCell,
  height,
  width,
  index,
  isDragging,
  properties,
  setClickPoint,
  setIsDragging,
  setPositionPoint,
  fixPositionCenter,
  x = 0,
  y = 0,
}) => {
  const element = useRef<any>(null)
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  // on drag start point
  const onDragStartPoint = () => {
    setIsDragging(true)
    setClickPoint()
  }

  // on grad point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    setXY({ x: event.evt.clientX, y: event.evt.clientY })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {    
    const point = getCell(event.evt.clientX, event.evt.clientY, width, height)

    if (active && point && element.current) {
      const posX = Math.floor(point[0] + point[2] / 2)
      const posY = Math.floor(point[1] + point[2] / 2)

      element.current.to({
        x: posX,
        y: posY,
        duration: 0.4,
      })
      
      setPositionPoint(posX, posY)
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
        x={!isDragging && !active ? x : xy.x}
        y={!isDragging && !active ? y : xy.y}
      />
    </>
  )
}

export default WithPoint(Point)
