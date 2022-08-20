import React, { useEffect, useRef, useState } from 'react'
import { Circle, Group } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import { WithPoint } from './withPoint'
import ToolTip from '../ToolTip'

// point
const Point: React.FC<any> = ({
  active,
  currentPoint,
  getCell,
  height,
  index,
  isDragging,
  position,
  properties,
  setIsDragging,
  setNewPoint,
  setPositionPoint,
  width,
  x,
  y,
}) => {
  const element = useRef<any>(null)
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsDragging(true)
  }

  // on grad point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const x = event.evt.clientX
    const y = event.evt.clientY

    setXY({ x, y })
    setNewPoint({ x, y })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true
    
    const point = getCell(event.evt.clientX, event.evt.clientY, width, height)

    if (active && point && element.current) {
      const posX = Math.floor(point[0] + point[2] / 2)
      const posY = Math.floor(point[1] + point[2] / 2)

      element.current.to({
        x: posX,
        y: posY,
        duration: 0.4,
      })
      
      setPositionPoint(posX, posY, currentPoint)
      setIsDragging(false)
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
  }

  useEffect(() => {
    if (typeof element.current.to !== 'undefined') {
      element.current.to({ ...properties })
    }
  }, [properties])

  // pos tooltip
  const posX = xy.x
  const posY = xy.y - (50 + properties.radius)

  const point = getCell(x, y, window.innerWidth, window.innerHeight)
  const xPoint = Math.floor(point[0] + point[2] / 2)
  const yPoint = Math.floor(point[1] + point[2] / 2)

  // render
  return (
    <Group>
      {(currentPoint === index && active && isDragging) &&
        <ToolTip x={posX} y={posY} />}

      <Circle
        {...properties}
        x={xPoint ?? x}
        y={yPoint ?? y}
        draggable={active}
        ref={element}
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        stroke={(currentPoint === index) ? properties.active : properties.stroke }
      />
    </Group>
  )
}

export default WithPoint(Point)
