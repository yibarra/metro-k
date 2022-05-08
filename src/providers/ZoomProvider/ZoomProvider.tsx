import React, { createContext, useState } from 'react'

import type {
  PositionType,
  ZoomContextProps,
  ZoomProviderProps,
} from './interfaces'

// zoom context
const ZoomContext = createContext({} as ZoomContextProps)

// zoom provider
const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
  const [ position, setPosition ] = useState<PositionType>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  })
  const [ scale, setScale ] = useState<number>(1)

  // render
  return (
    <ZoomContext.Provider value={{
      position,
      scale,
      setPosition,
      setScale,
    }}>
      {children}
    </ZoomContext.Provider>
  )
}

export default ZoomProvider
