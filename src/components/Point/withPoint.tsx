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
      active,
      index,
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
      updateLayerPoint(
        {
          properties: {...properties},
          x: event.clientX,
          y: event.clientY,
        }, index
      )
    }, [index, properties, updateLayerPoint])

    // type
    const handlerEvents = useCallback((evt: any) => {
      if (!active || !evt) {
        return false
      }

      switch (evt.type) {
        case 'dragmove':
        case 'dragstart':
          setIsDragging(true)
          break
        case 'dragend':
        default:
          setIsDragging(false)
          break
      }
      
      setPositionPoint(evt.evt)
    }, [active, setPositionPoint])

    // render
    return (
      <Component
        {...(props as T)}
        handlerEvents={handlerEvents}
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