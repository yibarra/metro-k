import React, { createContext, useState } from 'react'

import type { LayersContextProps, LayersProvidersProps } from './interfaces'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const [current, setCurrent] = useState<number>(0) // index current
  const [currentPoint, setCurrentPoint] = useState<number>(0)
  const [enable, setEnable] = useState<boolean>(false)
  const [layers, setLayers] = useState<any[]>([
    {
      name: 'Default',
      lineProperties: {
        color: '#FF88FF',
        border: '#222333'
      },
      pointsProperties: {
        active: '#341341',
        color: '#209479',
        border: '#987443'
      },
      points: [
        { x: 10, y: 10, properties: { color: '#222', border: '#F33FAA' } },
        { x: 50, y: 50, properties: null },
      ]
    }, {
      name: 'Layer 2',
      lineProperties: {
        color: '#FF88FF',
        border: '#222333'
      },
      pointsProperties: {
        active: '#341341',
        color: '#209479',
        border: '#987443'
      },
      points: [
        { x: 110, y: 120, properties: { color: '#222', border: '#F33FAA' } },
        { x: 150, y: 350, properties: null },
      ]
    }
  ])

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

    setCurrentPoint(index)
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
      currentPoint,
      createLayerPoint,
      deleteLayer,
      enable,
      layers,
      updateLayer,
      updateLayerPoint,
      setCurrent,
      setCurrentPoint,
      setEnable,
    }}>
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
