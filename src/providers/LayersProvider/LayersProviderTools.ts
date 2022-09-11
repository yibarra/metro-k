import type { PointTypePosition } from '../../components/Point/interfaces'

// get point by position
export const getPointByPosition = (
  points: PointTypePosition[],
  position: number
): PointTypePosition => {
  return points.filter((point: PointTypePosition) => point.position === position)[0]
}

// get curve exist
export const getCurveExist = (curves: any[], pointInit: number, pointEnd: number): boolean => {
  if (!Array.isArray(curves) || !curves.length) {
    return false
  }

  return curves.filter(
    (curve: any) => {
      return (
        (curve.pointEnd === pointEnd && curve.pointInit === pointInit) ||
        (curve.pointEnd === pointInit && curve.pointInit === pointEnd)
      )
    }).length > 0
}

// get point exist in curve
export const getPointExistInCurve = (curves: any[], position: number): boolean | any[] => {
  if (!Array.isArray(curves) || !curves.length) {
    return false
  }

  const pointCurve = curves.filter(
    (curve: any) => curve.pointInit === position || curve.pointEnd === position
  )

  return pointCurve
}

// order points
export const orderPoints = (points: PointTypePosition[], index: number) => {
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