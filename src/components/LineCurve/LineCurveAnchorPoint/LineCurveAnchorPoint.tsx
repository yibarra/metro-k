import React, { useEffect, useRef } from 'react'
import { Line, Rect } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

const SIZE_ITEM = 8

const LineCurveAnchorPoint: React.FC<any> = ({
  getCell,
  index,
  isDragging,
  pointCurveInit,
  pointCurveEnd,
  pointEnd,
  pointInit,
  setIsAnchor,
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
    setIsAnchor(true)
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
    setIsAnchor(false)
    setIsDragging(false)
  }

  // line
  const getLinePoints = (point: any) => {
    const pointAnchorCurve = getCell(x, y)

    return {
      points: [
        point[0],
        point[1],
        isDragging ? x : pointAnchorCurve[0],
        isDragging ? y : pointAnchorCurve[1]
      ],
      stroke: 'purple',
      strokeWidth: 1,
    }
  }
  
  // use effect
  useEffect(() => {
    if (element.current && !isDragging) {
      element.current.to({
        duration: 0.2,
        x: posXY[0] - SIZE_ITEM / 2 ?? x,
        y: posXY[1] - SIZE_ITEM / 2 ?? y,
      })
    }
  }, [element, x, y, getCell, isDragging, posXY])

  // render
  return (
    <>
      <Line {...getLinePoints(pointCurveInit)} />
      <Line {...getLinePoints(pointCurveEnd)} />

      <Rect
        draggable
        height={SIZE_ITEM}
        fill="red"
        onDragStart={onDragStartPoint}
        onDragMove={onDragMovePoint}
        onDragEnd={onDragEndPoint}
        ref={element}
        width={SIZE_ITEM}
      />
    </>
  )
}

/*

*/

export default LineCurveAnchorPoint
