import React, { createContext, useState } from 'react'

import type { PointTypePosition } from '../../components/Point/interfaces'
import type { LayersContextProps, LayersProvidersProps } from './interfaces'
import { layerDefault } from './LayersProviderContext'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const [current, setCurrent] = useState<number>(0) // index current
  const [enable, setEnable] = useState<boolean>(false)
  const [removePoint, setRemovePoint] = useState<boolean>(false)
  const [layers, setLayers] = useState<any[]>(layerDefault)

  // create layer
  const createLayer = (layer: any) => {
    setLayers((oldLayers: any[]) => {
      return [
        ...oldLayers,
        layer
      ]
    })
  }

  // update layer points
  const createLayerPoint = (index: number, point: any) => {
    if (!enable) {
      return false
    }

    const layerSelected = layers[current]
    const layerProperties: Record<string, string | any> = {
      points: [],
      currentPoint: index
    }

    const pointsOrder = []

    for (let i = 0; i < layerSelected.points.length; i++) {
      const item = layerSelected.points[i]
      
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

    pointsOrder.push(point)
    layerProperties.points = pointsOrder

    updateLayer(current, layerProperties)
  }

  // delete layer
  const deleteLayer = (id: number) => {
    const resultLayers = [...layers]
    resultLayers.splice(resultLayers.findIndex((_, index) => index === id), 1)

    setCurrent((id - 1 < 0) ? 0 : id - 1)
    setLayers(resultLayers)
  }

  // remove layer point
  const deleteLayerPoint = (index: number) => {
    const currentPoint = index > 0 ? index - 1 : 0
    const points: PointTypePosition[] = []

    const temp = layers[current].points
    delete temp[index]

    for(let i = 0; i < temp.length; i++) {
      const point = temp[i]
      
      if (point) {
        console.info(point)
        if (index < i) {
          point.position = point.position - 1
        }
  
        points.push(point)
      }
    }

    updateLayer(current, {
      points,
      currentPoint
    })
  }

  // update layer
  const updateLayer = (index: number, data: any) => {
    setLayers(Object.values({...layers, [index]: {...layers[index], ...data }}))
  }

  // update layer point
  const updateLayerPoint = (point: any, index: number) => {
    const { points } = layers[current]
    points[index] = { ...point }

    updateLayer(current, { points })
  }

  // render
  return (
    <LayersContext.Provider value={{
      createLayer,
      current,
      createLayerPoint,
      deleteLayer,
      enable,
      layers,
      deleteLayerPoint,
      removePoint,
      setCurrent,
      setEnable,
      setRemovePoint,
      updateLayer,
      updateLayerPoint,
    }}>
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
