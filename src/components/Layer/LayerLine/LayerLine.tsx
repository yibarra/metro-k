import React, { useCallback } from 'react'

import Line from '../../Line'
import type { PointTypePosition } from '../../Point/interfaces'
import type { LayerLineProps } from './interfaces'

// layer line
const LayerLine: React.FC<LayerLineProps> = ({
  active,
  currentPoint,
  isDragging,
  points,
  properties,
  newPoint,
  ...props
}) => {
  // update points line
  const pointUpdate = (points: PointTypePosition[], type: string = ''): number[][] => {
    if (!Array.isArray(points)) {
      return []
    }

    return Object.values(
      points.map(
        (item: PointTypePosition, index: number) =>
          index === currentPoint && type === 'ref'
            ? [ newPoint.x, newPoint.y ]
            : [ item.x, item.y ]
      )
    )
  }

  // order points
  const orderPoints = useCallback((): PointTypePosition[] => {
    return points.sort((a: PointTypePosition, b: PointTypePosition) => {
      if (a.position > b.position) return 1
      if (a.position < b.position) return -1

      return 0
    })
  }, [points])

  // render
  return (
    <>
      <Line
        {...props}
        active={active}
        isDragging={isDragging}
        points={pointUpdate(orderPoints())}
        properties={{
          ...properties,
          opacity: isDragging || !active ? 0 : 1,
          shadowColor: "#2f5ada"
        }}
      />

      <Line
        {...props}
        active={active}
        isDragging={isDragging}
        points={pointUpdate(orderPoints(), 'ref')}
        properties={{
          ...properties,
          opacity: isDragging && active ? 1 : 0,
          shadowColor: "#2f5ada",
        }}
      />
    </>
  )
}

export default LayerLine
