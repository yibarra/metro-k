import React, { createContext, useContext, useState } from 'react'

import { MainContext } from '../MainProvider/MainProvider'
import { getCurveExist, getPointByPosition, getPointExistInCurve, orderPoints } from './LayersProviderTools'
import type { MainContextProps } from '../MainProvider/interfaces'
import type { PointTypePosition } from '../../components/Point/interfaces'
import type { LayersContextProps, LayersProvidersProps } from './interfaces'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const { data, enable, remove } = useContext<MainContextProps>(MainContext)

  const [current, setCurrent] = useState<number>(0) // index current
  const [layers, setLayers] = useState<any[]>(data.layers)

  // create layer
  const createLayer = (layer: any) => {
    setLayers((oldLayers: any[]) => {
      return [
        ...oldLayers,
        layer
      ]
    })
  }

  // create curve
  const createLayerCurve = (pointInit: PointTypePosition, pointEnd: PointTypePosition) => {
    if (!pointInit || !pointEnd) {
      return false
    }

    const curves = layers[current].curves ?? []
    const checked = getCurveExist(curves, pointInit.position, pointEnd.position)

    if (!checked) {
      const curveX = (pointEnd.x + pointInit.x) / 2
      const curveY = (pointEnd.y + pointInit.y) / 2
  
      curves.push({
        pointInit: pointInit.position,
        pointEnd: pointEnd.position,
        curve: [curveX, curveY]
      })
  
      updateLayer(current, { curves })
    }
  }

  // update layer points
  const createLayerPoint = (index: number, point: any): void | boolean => {
    if (!enable) {
      return false
    }

    const layerSelected = layers[current]
    const layerProperties: Record<string, string | any> = {
      points: [],
      currentPoint: index
    }

    const pointsOrder = orderPoints(layerSelected.points, index)

    if (pointsOrder) {
      pointsOrder.push(point)
      layerProperties.points = pointsOrder
  
      updateLayer(current, layerProperties)
    }
  }

  // delete layer
  const deleteLayer = (id: number) => {
    const resultLayers = [...layers]
    resultLayers.splice(resultLayers.findIndex((_, index) => index === id), 1)

    setCurrent((id - 1 < 0) ? 0 : id - 1)
    setLayers(resultLayers)
  }

  // remove layer point item
  const deleteLayerCurve = (index: number): any[] => {
    const curves = []
    const curvesRemoves = getPointExistInCurve(layers[current].curves, index)

    if (Array.isArray(curvesRemoves)) {
      for (let j = 0; j < curvesRemoves.length; j++) {
        const curve = curvesRemoves[j]
        const indexCurve = layers[current].curves.indexOf(curve)

        if (indexCurve === -1) {
          curves.push(curve)
        }
      }
    }

    return curves
  }

  // remove layer point
  const deleteLayerPoint = (index: number): void | boolean => {
    if (!remove) {
      return false
    }

    const currentPoint = index > 0 ? index - 1 : 0
    const points: PointTypePosition[] = []
    const curves = deleteLayerCurve(index)

    const temp = layers[current].points
    
    delete temp[index]

    for(let i = 0; i < temp.length; i++) {
      const point = temp[i]
      
      if (point) {
        if (index < i) {
          point.position = point.position - 1
        }
  
        points.push(point)
      }
    }

    updateLayer(current, { curves, points, currentPoint })
  }

  // update layer
  const updateLayer = (index: number, data: any): void => {
    setLayers(Object.values({...layers, [index]: {...layers[index], ...data }}))
  }

  // update layer point
  const updateLayerPoint = (point: PointTypePosition, index: number): void => {
    const { points } = layers[current]
    points[index] = { ...point }

    updateLayer(current, { points })
  }

  // update layer curve point
  const updateLayerCurvePoint = (
    index: number,
    init: number,
    end: number,
    curve: number[]
  ) => {
    const { points, curves: curveOld } = layers[current]
    const item = curveOld[index] // current curve
    
    if (item) {
      const curves = [...curveOld]

      const pointInit = getPointByPosition(points, init)
      const pointEnd = getPointByPosition(points, end)

      if (pointInit && pointEnd) {
        curves[index] = {
          curve,
          pointInit: pointInit.position,
          pointEnd: pointEnd.position,
        }

        updateLayer(current, { curves })
      }
    }
  }

  // render
  return (
    <LayersContext.Provider value={{
      createLayer,
      current,
      createLayerCurve,
      createLayerPoint,
      deleteLayer,
      layers,
      deleteLayerPoint,
      setCurrent,
      updateLayer,
      updateLayerPoint,
      updateLayerCurvePoint,
    }}>
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
