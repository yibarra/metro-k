import React, { useEffect, useRef } from 'react'
import { Line } from 'react-konva'

// grid line
const GridLine: React.FC<any> = ({ animation, index, points }) => {
  const line = useRef<any>(null)

  // use effect
  useEffect(() => {
    if (animation) {
      line.current.to({ duration: 0.4, scaleY: 1, opacity: 0.1 })
    }
  }, [animation])

  // render
  return (
    <Line
      ref={line}
      key={index}
      opacity={0}
      points={points}
      stroke="#222"
      strokeWidth={1}
    />
  )
}

export default GridLine
