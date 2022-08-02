import React, { useCallback } from 'react'
import UseWindowSize from '../../hooks/useWindowSize'

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
      isDragging,
      properties,
      setCurrentPoint,
      setIsDragging,
      updateLayerPoint,
    } = props
    const { height, width } = UseWindowSize()

    // set click point
    const setClickPoint = useCallback(() => {
      setCurrentPoint(index)
    }, [index, setCurrentPoint])

    // set position point
    const setPositionPoint = useCallback((posX: number, posY: number) => {
      if (!posX || !posY) {
        return false;
      }

      updateLayerPoint(
        {
          properties: {...properties},
          x: posX,
          y: posY,
        }, index
      )
    }, [index, properties, updateLayerPoint])

    // render
    return (
      <Component
        {...(props as T)}
        height={height}
        isDragging={isDragging}
        setClickPoint={setClickPoint}
        setIsDragging={setIsDragging}
        setPositionPoint={setPositionPoint}
        width={width}
      />
    )
  }

  Point.displayName = `withPoint(${displayName})`

  return Point
}
