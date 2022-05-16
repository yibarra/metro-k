import React from 'react'
import { Line as LineKonva } from 'react-konva'

// line
const Line: React.FC<any> = ({ points, strokeWidth }) => {
  // convert points
  const convertPoints = (items: []) => {
    const pointsResult: any[] = []

    for (const item of items) {
      pointsResult.push(...Object.values(item))
    }

    return pointsResult
  }

  // render
  return (
    <LineKonva
      shadowBlur={3}
      shadowOffset={{ x: 0, y: 0 }}
      shadowColor="red"
      lineCap="round"
      lineJoin="round"
      strokeWidth={strokeWidth}
      tension={0.5}
      stroke="#333333"
      points={convertPoints(points)}
    />
  )
}

export default Line