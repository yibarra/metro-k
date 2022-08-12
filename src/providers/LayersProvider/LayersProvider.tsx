import React, { createContext, useState } from 'react'

import type { LayersContextProps, LayersProvidersProps } from './interfaces'
import { layerDefault } from './LayersProviderContext'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const [current, setCurrent] = useState<number>(0) // index current
  const [enable, setEnable] = useState<boolean>(false)
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

    const temp = { ...layers[current] }
    const points = [
      ...temp.points.slice(0, index),
      point,
      ...temp.points.slice(index),
    ]

    updateLayer(current, { points })
  }

  // delete layer
  const deleteLayer = (id: number) => {
    const resultLayers = [...layers]
    resultLayers.splice(resultLayers.findIndex((_, index) => index === id), 1)

    setCurrent((id - 1 < 0) ? 0 : id - 1)
    setLayers(resultLayers)
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
      updateLayer,
      updateLayerPoint,
      setCurrent,
      setEnable,
    }}>
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
