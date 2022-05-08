import React, { createContext, useEffect, useState } from 'react'
import WebFontLoader from 'webfontloader'

import UseWindowSize from '../../hooks/useWindowSize'
import type { MainContextProps } from './interfaces'

// main context
const MainContext = createContext({} as MainContextProps)

// main provider
const MainProvider: React.FC<any> = ({ children }) => {
  const size = UseWindowSize()

  const [ animate, setAnimate ] = useState<boolean>(true)
  const [ loaded, setLoaded ] = useState<boolean>(false)

  // loading effects.
  useEffect(() => {
    // fetch necessary fonts.
    WebFontLoader.load({
      google: {
        families: [
          "Roboto Condensed:300,400,700",
          "Roboto Slab:300,400,500,600"
        ]
      }, fontactive: () => {
        setTimeout(() => setLoaded(true), 500)
      }
    })
  }, [])
  
  // render
  return (
    <MainContext.Provider value={{
      animate,
      loaded,
      setAnimate,
      setLoaded,
      size,
    }}>
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
export default MainProvider