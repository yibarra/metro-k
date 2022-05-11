import React, { createContext, useState } from 'react'

import type { LayersContextProps, LayersProvidersProps } from './interfaces'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const [enable, setEnable] = useState<boolean>(true)
  const [layers, setLayers] = useState<any[]>([{ name: 'Default', points: [] }])
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

  // update layer points
  const updateLayerPoints = (point: any) => {
    if (!enable) {
      return false
    }

    const temp = { ...layers[current] }
    const points = [...temp.points, point]

    updateLayer(current, { points })
  }

  // render
  return (
    <LayersContext.Provider value={{
      createLayer,
      current,
      deleteLayer,
      layers,
      updateLayer,
      updateLayerPoints,
      setCurrent,
      setEnable,
    }}>
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
