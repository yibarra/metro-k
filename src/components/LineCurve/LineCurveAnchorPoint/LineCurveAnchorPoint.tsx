import React, { useRef } from 'react'
import { Rect, Shape } from 'react-konva'
import { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Shape as ShapeType } from 'konva/lib/Shape'

const LineCurveAnchorPoint: React.FC<any> = ({
  getCell,
  index,
  pointEnd,
  pointInit,
  setIsDragging,
  setXY,
  updateLayerCurvePoint,
  x,
  y,
}) => {
  const element = useRef<any>(null)

  // on drag start point
  const onDragStartPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    setIsDragging(true)
  }

  // on grad point
  const onDragMovePoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY }} = event
    const xPos = clientX
    const yPos = clientY

    setXY({ x: xPos, y: yPos })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event
    const point = getCell(clientX, clientY)

    if (point) {
      const posX = point[0]
      const posY = point[1]
      
      updateLayerCurvePoint(index, pointInit.position, pointEnd.position, [posX, posY])
      setIsDragging(false)
    } else {
      element.current.to({ x, y, duration: 0.2 })
    }
  }

  // draw point anchor
  const drawPointAnchor = (context: Context, shape: ShapeType) => {
    const pointAnchorEnd = getCell(pointInit.x, pointInit.y)
    const pointAnchorInit = getCell(pointEnd.x, pointEnd.y)
    const pointAnchorCurve = getCell(x, y)

    // position
    context.beginPath()

    context.moveTo(pointAnchorEnd[0], pointAnchorEnd[1])
    context.lineTo(pointAnchorCurve[0], pointAnchorCurve[1])
    context.moveTo(pointAnchorInit[0], pointAnchorInit[1])
    context.lineTo(pointAnchorCurve[0], pointAnchorCurve[1])

    context.fillStrokeShape(shape)
  }

  // render
  return (
    <>
      <Shape
        sceneFunc={drawPointAnchor}
        stroke="green"
        strokeWidth={2}
      />

      <Rect
        draggable
        fill="blue"
        height={8}
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        ref={element}
        x={x}
        y={y}
        width={8}
        zIndex={10}
      />  
    </>
  )
}

/*

*/

export default LineCurveAnchorPoint
