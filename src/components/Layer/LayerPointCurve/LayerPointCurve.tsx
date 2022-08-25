import React, { useRef, useState } from 'react'
import type { KonvaEventObject } from 'konva/lib/Node'

import { Rect, Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'

const LayerPointCurve: React.FC<any> = ({
  isDragging,
  getCell,
  setIsDragging,
  pointInit,
  pointEnd,
}) => {
  const { innerHeight, innerWidth } = window
  
  const x = ((pointInit.x + pointEnd.x) / 2) - pointInit.x
  const y = ((pointInit.y + pointEnd.y) / 2) - pointInit.y
  
  console.info(x, y)

  const element = useRef<any>(null)
  const point = getCell(x, y, innerWidth, innerHeight)
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsDragging(true)
  }

  // on grad point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const xPos = event.evt.clientX
    const yPos = event.evt.clientY

    setXY({ x: xPos, y: yPos })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true
    
    const point = getCell(event.evt.clientX, event.evt.clientY, innerWidth, innerHeight)

    if (point && element.current) {
      const posX = Math.floor(point[0] + point[2] / 2)
      const posY = Math.floor(point[1] + point[2] / 2)

      element.current.to({
        x: posX,
        y: posY,
        duration: 0.4,
      })
      
      setIsDragging(false)
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
  }

  const drawLines = (context: Context, shape: ShapeType) => {
    context.beginPath()

    context.moveTo(pointInit.x, pointInit.y)
    shape.stroke('blue')

    context.quadraticCurveTo(
      xy.x,
      xy.y,
      pointEnd.x,
      pointEnd.y,
    )

    context.fillStrokeShape(shape)
  }

  // position
  const xPoint = Math.floor(point[0] + point[2] / 2)
  const yPoint = Math.floor(point[1] + point[2] / 2)

  return (
    <>
      <Rect
        height={10}
        draggable
        ref={element}
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        onClick={() => console.info('HA')}
        x={xPoint}
        y={yPoint}
        width={10}
        fill="red"
      />

      <Shape sceneFunc={drawLines} />
    </>
  )
}

export default LayerPointCurve