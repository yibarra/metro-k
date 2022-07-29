import React, { useEffect, useRef } from 'react'
import { Line as LineKonva } from 'react-konva'

import { LineProps } from './interfaces'

// line
const Line: React.FC<LineProps> = ({ points, properties }) => {
  const element = useRef<any>(null)

  // convert points
  const convertPoints = (items: []) => {
    const pointsResult: any[] = []

    for (const item of items) {
      pointsResult.push(...Object.values(item))
    }

    return pointsResult
  }

  // use effect
  useEffect(() => {
    if (typeof element.current.to !== 'undefined') {
      element.current.to({ ...properties })
    }
  }, [properties])

  // render
  return (
    <LineKonva
      {...properties}
      ref={element}
      shadowBlur={3}
      shadowOffset={{ x: 0, y: 0 }}
      shadowColor="#2f5ada"
      points={convertPoints(points)}
    />
  )
}

export default Line