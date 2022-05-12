import React, { createContext, useState } from 'react'

import type { LayersContextProps, LayersProvidersProps } from './interfaces'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const [enable, setEnable] = useState<boolean>(false)
  const [layers, setLayers] = useState<any[]>([{ name: 'Default', points: [{ x: 10, y: 10 }] }])
  const [current, setCurrent] = useState<number>(0) // index current

  // create layer
  const createLayer = (layer: any) => {
    setLayers((oldLayer: any[]) => {
      return [
        ...oldLayer,
        layer
      ]
    })
  }

  // update layer points
  const createLayerPoint = (point: any) => {
    if (!enable) {
      return false
    }

    const temp = { ...layers[current] }
    const points = [...temp.points, point]

    updateLayer(current, { points })
  }

  // delete layer
  const deleteLayer = (id: number) => {
    const resultLayers = [...layers]
    resultLayers.splice(resultLayers.findIndex((_, index) => index === id), 1)

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
