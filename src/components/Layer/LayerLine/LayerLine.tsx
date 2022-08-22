import React, { useCallback } from 'react'

import Line from '../../Line'
import type { PointTypePosition } from '../../Point/interfaces'
import type { LayerLineProps } from './interfaces'

// layer line
const LayerLine: React.FC<LayerLineProps> = ({
  active,
  currentPoint,
  getCell,
  isDragging,
  points,
  properties,
  newPoint,
}) => {
  // update points line
  const pointUpdate = (points: PointTypePosition[], type: string = ''): number[][] => {
    if (!Array.isArray(points)) {
      return []
    }

    console.info(currentPoint)

    return Object.values(
      points.map(
        (item: any, index: number) =>
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
        active={active}
        getCell={getCell}
        isDragging={isDragging}
        points={pointUpdate(orderPoints())}
        properties={{
          ...properties,
          opacity: isDragging || !active ? 0.4 : 1,
          shadowColor: "#2f5ada"
        }}
      />

      <Line
        active={active}
        getCell={getCell}
        isDragging={isDragging}
        points={pointUpdate(points, 'ref')}
        properties={{
          ...properties,
          strokeWidth: properties?.strokeWidth ?? 5 / 3,
          dash: [3, 3],
          opacity: isDragging && active ? 0.5 : 0,
          shadowColor: "#2f5ada",
        }}
      />
    </>
  )
}

export default LayerLine
