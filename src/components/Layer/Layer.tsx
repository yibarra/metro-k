import React from 'react'
import { Layer as LayerKonva } from 'react-konva'
import Point from '../Point'

// layer
const Layer: React.FC<any> = ({ points }) => {
  // render
  return (
    <LayerKonva>
      {Array.isArray(points) && points.map((point: any, index: number) =>
        <Point key={index} {...point} />
      )}
    </LayerKonva>
  )
}

export default Layer