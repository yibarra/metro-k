import React, { useContext, useEffect } from 'react'
import { Stage, Layer as LayerKonva } from 'react-konva'

import Grid from '../../components/Grid'
import Layer from '../../components/Layer'
import { GridContext } from '../../providers/GridProvider/GridProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'

import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import { MainSection } from './styles'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import Controls from '../../components/Controls'

// main
const Main: React.FC<any> = () => {
  const { loaded, size } = useContext<MainContextProps>(MainContext)
  const { grid, calculateGridWidth, setGrid } = useContext<any>(GridContext)
  const { current, currentPoint, setCurrentPoint, layers, createLayerPoint, updateLayerPoint } = useContext<any>(LayersContext)

  // use effect
  useEffect(() => {
    if (size.width) {
      setGrid(calculateGridWidth(120, size.width))
    }
  }, [calculateGridWidth, setGrid, size.width])

  // render
  return (
    <MainSection>
      {loaded && size &&
        <Stage
          className="stage"
          height={size.height}
          onClick={({ evt }: any) => createLayerPoint(currentPoint + 1, { x: evt.clientX, y: evt.clientY })}
          width={size.width}
        >
          <LayerKonva>
            <Grid grid={grid} {...size} />

            {Array.isArray(layers) && layers.map((layer: any, index: number) =>
              <Layer
                active={current === index}
                currentPoint={currentPoint}
                key={index}
                setCurrentPoint={setCurrentPoint}
                size={grid}
                updateLayerPoint={updateLayerPoint}
                {...layer}
              />
            )}
          </LayerKonva>
        </Stage>}

      <Controls />
    </MainSection>
  );
};

export default Main