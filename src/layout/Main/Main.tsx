import React, { useContext, useEffect } from 'react'
import { Stage } from 'react-konva'

import Grid from '../../components/Grid'
import Layer from '../../components/Layer'
import { GridContext } from '../../providers/GridProvider/GridProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'

import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import { MainSection } from './styles'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'

// main
const Main: React.FC<any> = () => {
  const { loaded, size } = useContext<MainContextProps>(MainContext)
  const { grid, calculateGridWidth, setGrid } = useContext<any>(GridContext)
  const { layers, setLayer } = useContext<any>(LayersContext)

  // use effect
  useEffect(() => {
    if (size.width) {
      setGrid(calculateGridWidth(110, size.width))
    }
  }, [calculateGridWidth, setGrid, size.width])

  console.info(layers)

  // render
  return (
    <MainSection>
      {loaded && size &&
        <Stage
          className="stage"
          height={size.height}
          onClick={({ evt }: any) => setLayer({ x: evt.clientX, y: evt.clientY })}
          width={size.width}>
          <Grid grid={grid} {...size} />
          {Array.isArray(layers) && layers.map((layer: any, index: number) =>
            <Layer key={index} {...layer} />
          )}
        </Stage>}
    </MainSection>
  );
};

export default Main