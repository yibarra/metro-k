import React, { useEffect, useRef } from 'react'
import { Line as LineKonva } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

import type { LineProps } from './interfaces'

// line
const Line: React.FC<LineProps> = ({
  active = false,
  curves,
  getCell,
  isDragging = false,
  points,
  properties,
}) => {
  const elementLayerRef = useRef<any>(null)

  // find point curve
  const findPointCurve = (index: number) => {
    let translate = false
    let pointInitial = false

    const element = curves.filter((item: any) => {
      if (item.pointEnd === index || item.pointInit === index) {
        if (item.pointInit === index) {
          translate = true
        }

        if (item.pointEnd === index) {
          pointInitial = true
        }

        return true
      }

      return false
    })

    return {
      element: element[0],
      pointInitial,
      translate
    }
  }

  // convert points
  const convertPoints = (items: number[][]): number[][] => {
    const result: number[][] = []

    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      const point = [item[0], item[1]]

      if (point) {
        const { element } = findPointCurve(index)
        const x: number = Math.floor(point[0])
        const y: number = Math.floor(point[1])

        if (!element) {
          result.push([x, y, 0])
        }

        if (element) {
          if (element.pointInit === index && element.pointInit < element.pointEnd) {
            result.push([x, y, 0])
          } else {
            result.push([x, y, 1])
          }
        }
      }
    }

    return result
  }

  // draw line
  const drawLine = (context: Context, shape: Shape) => {
    const lines = convertPoints(points)

    context.beginPath()

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line) {
        const [ x, y, move ] = line

        if (move) {
          context.moveTo(x, y)
        } else {
          context.lineTo(x, y)
        }
      }
    }
    
    context.fillStrokeShape(shape)
  }

  // use effect
  useEffect(() => {
    if (typeof elementLayerRef.current.to !== 'undefined') {
      elementLayerRef.current.to({ ...properties })
    }
  }, [active, isDragging, properties])

  // render
  return (
    <LineKonva
      {...properties}
      listening={false}
      ref={elementLayerRef}
      sceneFunc={drawLine}
    />
  )
}

export default Line
