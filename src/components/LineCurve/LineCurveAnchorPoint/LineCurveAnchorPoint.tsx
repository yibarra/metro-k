import React, { useEffect, useRef } from 'react'
import { Rect, Shape } from 'react-konva'
import { Context } from 'konva/lib/Context'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Shape as ShapeType } from 'konva/lib/Shape'

const LineCurveAnchorPoint: React.FC<any> = ({
  getCell,
  index,
  isDragging,
  point,
  pointCurveInit,
  pointCurveEnd,
  pointEnd,
  pointInit,
  setIsDragging,
  setXY,
  updateLayerCurvePoint,
  x,
  y,
}) => {
  const posXY = getCell(x, y)
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
    setXY({ x: clientX, y: clientY })
  }

  // on drag end point
  const onDragEndPoint = (event: KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true

    const { evt: { clientX, clientY } } = event

    updateLayerCurvePoint(index, pointInit.position, pointEnd.position, [clientX, clientY])
    setIsDragging(false)
  }

  // draw point anchor
  const drawPointAnchor = (context: Context, shape: ShapeType) => {
    const pointAnchorCurve = getCell(x, y)

    // position
    context.beginPath()

    if (isDragging) {
      context.moveTo(pointCurveInit[0], pointCurveInit[1])
      context.lineTo(x, y)
      context.moveTo(pointCurveEnd[0], pointCurveEnd[1])
      context.lineTo(x, y)
    } else {
      context.moveTo(pointCurveInit[0], pointCurveInit[1])
      context.lineTo(pointAnchorCurve[0], pointAnchorCurve[1])
      context.moveTo(pointCurveEnd[0], pointCurveEnd[1])
      context.lineTo(pointAnchorCurve[0], pointAnchorCurve[1])
    }

    context.closePath()

    context.fillStrokeShape(shape)
  }

  
  // use effect
  useEffect(() => {
    if (element.current && !isDragging) {
      element.current.to({ x: posXY[0] - 5 ?? x, y: posXY[1] - 5 ?? y, duration: 0.2 })
    }
  }, [element, x, y, getCell, isDragging, posXY])

  // render
  return (
    <>
      <Shape
        sceneFunc={drawPointAnchor}
        stroke="green"
        strokeWidth={1}
      />

      <Rect
        draggable
        height={10}
        fill="red"
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        ref={element}
        width={10}
      />
    </>
  )
}

/*

*/

export default LineCurveAnchorPoint
