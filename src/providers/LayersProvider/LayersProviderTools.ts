import type { PointTypePosition } from '../../components/Point/interfaces'

// get point by position
export const getPointByPosition = (
  points: PointTypePosition[],
  position: number
): PointTypePosition => {
  return points.filter((point: PointTypePosition) => point.position === position)[0]
}

// order points
export const OrderPoints = (points: PointTypePosition[], index: number) => {
  if (!points) {
    return []
  }

  const pointsOrder = []

  for (let i = 0; i < points.length; i++) {
    const item = points[i]
    
    if (index > item?.position) {
      pointsOrder.push(item)
    } else {
      const itemUpdate = {
        ...item,
        position: Number(item?.position) + 1,
      }

      pointsOrder.push(itemUpdate)
    }
  }

  return pointsOrder
}