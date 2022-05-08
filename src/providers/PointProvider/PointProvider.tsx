// point
// position
// color
// type - null - empty
// drag
// collision

import React, { createContext, useState } from 'react'

const PointContext = createContext({})


const PointProvider: React.FC<any> = ({
  children,
}) => {
  const [pos, setPos] = useState<any>({ x: 0, y: 0 })
  /* const [properties, setProperties] = useState<{
    color: string
    borderColor: string
    borderSize: string
    size: number
  }>({})
  */

  return (
    <PointContext.Provider value={{
      pos,
      setPos
    }}>
      {children}
    </PointContext.Provider>
  )
}

export { PointContext, PointProvider }
export default PointProvider