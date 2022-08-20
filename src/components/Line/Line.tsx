import React, { useEffect, useRef } from 'react'
import { Line as LineKonva } from 'react-konva'

import { LineProps } from './interfaces'

// line
const Line: React.FC<LineProps> = ({
  active = false,
  getCell,
  isDragging = false,
  points,
  properties,
}) => {
  const element = useRef<any>(null)

  // convert points
  const convertPoints = (items: []) => {
    const pointsResult: any[] = []

    for (const item of items) {
      const point = getCell(item[0], item[1], window.innerWidth, window.innerHeight)
      const x = Math.floor(point[0] + point[2] / 2)
      const y = Math.floor(point[1] + point[2] / 2)

      pointsResult.push(x)
      pointsResult.push(y)
    }

    return pointsResult
  }

  // use effect
  useEffect(() => {
    if (typeof element.current.to !== 'undefined') {
      element.current.to({ ...properties })
    }
  }, [active, isDragging, properties])

  // render
  return (
    <LineKonva
      {...properties}
      listening={false}
      ref={element}
      points={convertPoints(points)}
    />
  )
}

export default Line
