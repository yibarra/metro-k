import React, { useRef } from 'react'
import { Rect, Shape } from 'react-konva'
import { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Shape as ShapeType } from 'konva/lib/Shape'

const LineCurveAnchorPoint: React.FC<any> = ({
  curve,
  getCell,
  index,
  point,
  pointEnd,
  pointInit,
  setIsDragging,
  setXY,
  updateLayerCurvePoint,
  x,
  y,
}) => {
  const element = useRef<any>(null)
  const { innerWidth, innerHeight } = window

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

    if (point) {
      const posX = Math.floor(point[0] + point[2] / 2)
      const posY = Math.floor(point[1] + point[2] / 2)
      
      updateLayerCurvePoint(index, pointInit.position, pointEnd.position, [posX, posY])
      setIsDragging(false)
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
  }

  // draw point anchor
  const drawPointAnchor = (context: Context, shape: ShapeType) => {
    // position
    context.beginPath()

    context.moveTo(pointInit.x, pointInit.y)
    context.lineTo(x, y)
    context.moveTo(pointEnd.x, pointEnd.y)
    context.lineTo(x, y)

    context.fillStrokeShape(shape)
  }

  // render
  return (
    <>
      <Shape
        fill="red"
        ref={element}
        sceneFunc={drawPointAnchor}
        stroke="green"
        strokeWidth={2}
      />

      <Rect
        height={10}
        draggable
        ref={element}
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        x={x}
        y={y}
        rotation={45}
        width={10}
        fill="red"
      />  
    </>
  )
}

/*

*/

export default LineCurveAnchorPoint
