import React from 'react'

import Point from '../../Point'

// layer points
const LayerPoints: React.FC<any> = ({
  active,
  isDragging,
  getCell,
  layer,
  points,
  setIsDragging,
  setCurrentPoint,
  updateLayerPoint,
  newPoint,
  setNewPoint,
}) => {
  console.info(points, 'UPDATE POINTS')

  // render
  return (
    <>
      {Array.isArray(points) && points.map((point: any, index: number) =>
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
  )
}

export default LayerPoints
