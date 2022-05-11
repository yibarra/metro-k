import React, { createContext } from 'react'

const ColorContext = createContext({})

// color provider
const ColorProvider: React.FC<any> = ({
  children,
}) => {
  // get random color
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    const color = `hsl(${hue}, 70%, 80%)`

    return color
  }

  return (
    <ColorContext.Provider value={{
      getRandomPastelColor,
    }}>
      {children}
    </ColorContext.Provider>
  )
}

export { ColorContext, ColorProvider }
export default ColorProvider