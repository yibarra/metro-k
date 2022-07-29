import React, { createContext, useState } from 'react'

import type { LayersContextProps, LayersProvidersProps } from './interfaces'

// layers context
const LayersContext = createContext({} as LayersContextProps)

// layers provider
const LayersProvider: React.FC<LayersProvidersProps> = ({ children }) => {
  const [current, setCurrent] = useState<number>(0) // index current
  const [enable, setEnable] = useState<boolean>(false)
  const [layers, setLayers] = useState<any[]>([
    {
      name: 'Default',
      currentPoint: 0,
      lineProperties: {
        dash: [0, 0],
        lineCap: 'butt',
        lineJoin: 'miter',
        stroke: '#2f5ada',
        strokeWidth: 2,
        tension: 0,
      },
      pointsProperties: {
        active: '#222EEE',
        dash: [0, 0],
        fill: '#FFFFFF',
        lineCap: 'butt',
        lineJoin: 'miter',
        radius: 5,
        stroke: '#222222',
        strokeWidth: 2,
      },
      points: [
        {
          x: 10,
          y: 10,
          properties: {
            dash: [5, 5],
            fill: '#987443',
            lineCap: 'butt',
            lineJoin: 'miter',
            radius: 5,
            stroke: '#209479',
            strokeWidth: 2,
          }
        },
        { x: 50, y: 50 },
      ]
    }, {
      name: 'Layer 2',
      currentPoint: 0,
      lineProperties: {
        border: '#222333',
        dash: [0, 0],
        lineCap: 'butt',
        lineJoin: 'miter',
        stroke: '#FF844F',
        strokeWidth: 2,
        tension: 0,
      },
      pointsProperties: {
        active: '#341341',
        dash: [5, 5],
        fill: '#987443',
        lineCap: 'butt',
        lineJoin: 'miter',
        radius: 5,
        stroke: '#209479',
        strokeWidth: 2,
      },
      points: [
        {
          x: 110,
          y: 120,
          properties: {
            dash: [5, 5],
            fill: '#98AA43',
            lineCap: 'butt',
            lineJoin: 'miter',
            radius: 5,
            stroke: '#2EE479',
            strokeWidth: 2,
          }
        },
        { x: 150, y: 350 },
      ]
    }
  ])

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
    console.info(data)
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
