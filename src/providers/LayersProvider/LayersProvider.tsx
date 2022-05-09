import React, { createContext, useState } from 'react'

// layers context
const LayersContext = createContext({})

// layers provider
const LayersProvider: React.FC<any> = ({ children }) => {
  const [layers, setLayers] = useState<any[]>([])

  // set layer
  const setLayer = (layer: any) => {
    setLayers((oldLayer: any[]) => {
      return [
        ...oldLayer,
        layer
      ]
    })
  }

  // render
  return (
    <LayersContext.Provider value={{
      layers,
      setLayer
    }}>
      {children}
    </LayersContext.Provider>
  )
}

export { LayersContext, LayersProvider }
export default LayersProvider
