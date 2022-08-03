import React from 'react'

import Line from '../../Line'
import type { PointTypePosition } from '../../Point/interfaces'
import type { LayerLineProps } from './interfaces'

// layer line
const LayerLine: React.FC<LayerLineProps> = ({
  active,
  isDragging,
  newPoint,
  layer,
  points,
}) => {
  // update points line
  const pointUpdate = (points: PointTypePosition[], type: string = ''): number[][] => {
    if (!Array.isArray(points)) {
      return []
    }

    return Object.values(
      points.map(
        (item: any, index: number) =>
          index === layer.currentPoint && type === 'ref'
            ? [newPoint.x, newPoint.y]
            : [ item.x, item.y ]
      )
    )
  }

  // render
  return (
    <>
      <Line
        active={active}
        isDragging={isDragging}
        points={pointUpdate(points)}
        properties={{
          ...layer.lineProperties,
          opacity: isDragging || !active ? 0.4 : 1,
          shadowColor: "#2f5ada"
        }}
      />

      <Line
        active={active}
        isDragging={isDragging}
        points={pointUpdate(points, 'ref')}
        properties={{
          ...layer.lineProperties,
          strokeWidth: layer.lineProperties?.strokeWidth ?? 5 / 3,
          dash: [3, 3],
          opacity: isDragging && active ? 0.5 : 0,
          shadowColor: "#2f5ada",
        }}
      />
    </>
  )
}

export default LayerLine
