import React, { useCallback, useState } from 'react'
import { usePrevious } from 'react-delta'

import type { WithPointProps } from './interfaces'

// with point
export function WithPoint<T extends WithPointProps>(
  Component: React.ComponentType<T>
) {
  const displayName = Component.displayName ?? Component.name

  // point
  const Point = (props: WithPointProps) => {
    const {
      index,
      getCell,
      properties,
      setCurrentPoint,
      updateLayerPoint,
    } = props
    const propertiesPrevious = usePrevious(properties)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    // set click point
    const setClickPoint = useCallback(() => {
      setCurrentPoint(index)
    }, [index, setCurrentPoint])

    // set position point
    const setPositionPoint = useCallback((event: MouseEvent) => {
      const point = getCell(event.clientX, event.clientY)

      if (Array.isArray(point)) {
        updateLayerPoint(
          {
            properties: {...properties},
            x: point[0] + point[2] / 2,
            y: point[1] + point[2] / 2,
          }, index
        )
      }
    }, [getCell, index, properties, updateLayerPoint])

    // render
    return (
      <Component
        {...(props as T)}
        isDragging={isDragging}
        propertiesPrevious={propertiesPrevious}
        setClickPoint={setClickPoint}
        setIsDragging={setIsDragging}
        setPositionPoint={setPositionPoint}
      />
    )
  }

  Point.displayName = `withPoint(${displayName})`

  return Point
}
