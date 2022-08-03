import React, { useState } from 'react'
import { Group } from 'react-konva'

import Line from '../Line'
import Point from '../Point'

// layer
const Layer: React.FC<any> = ({
  active,
  index,
  layer,
  points,
  getCell,
  updateLayer,
  updateLayerPoint,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [newPoint, setNewPoint] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  // color
  // name
  // properties: line - stroke, color, type: dash, linejoin, linecap ... point stroke, color

  // set current point
  const setCurrentPoint = (value: number): void => {
    updateLayer(index, { currentPoint: value })
  }

  // line alternative
  const lineAlternative = (points: any) => {
    return Object.values(
      points.map(
        (item: any, index: number) =>
          index === layer.currentPoint ? [newPoint.x, newPoint.y] : [ item.x, item.y ]
      )
    )
  }

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          <Line
            active={active}
            isDragging={isDragging}
            points={Object.values(points.map((item) => [ item.x, item.y ]))}
            properties={{
              ...layer.lineProperties,
              opacity: isDragging || !active ? 0.4 : 1,
              shadowColor: "#2f5ada"
            }}
          />

          <Line
            active={active}
            isDragging={isDragging}
            points={lineAlternative(points)}
            properties={{
              ...layer.lineProperties,
              strokeWidth: layer.lineProperties.strokeWidth / 3,
              dash: [3, 3],
              opacity: isDragging || !active ? 0.5 : 0,
              shadowColor: "#2f5ada",
            }}
          />

          {points.map((point: any, index: number) =>
            <Point
              {...point}
              active={active}
              currentPoint={layer.currentPoint}
              index={index}
              isDragging={isDragging}
              key={index}
              getCell={getCell}
              properties={layer.pointsProperties}
              setIsDragging={setIsDragging}
              setCurrentPoint={setCurrentPoint}
              updateLayerPoint={updateLayerPoint}
              newPoint={newPoint}
              setNewPoint={setNewPoint}
            />
          )}
        </>
      }
    </Group>
  )
}

export default Layer