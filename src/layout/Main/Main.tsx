import React, { useContext } from 'react'
import { Stage, Layer as LayerKonva } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import Controls from '../../components/Controls'
import Grid from '../../components/Grid'
import Layer from '../../components/Layer'
import { GridContext } from '../../providers/GridProvider/GridProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import type { GridContextProps } from '../../providers/GridProvider/interfaces'
import { MainSection } from './styles'

// main
const Main: React.FC<any> = () => {
  const { loaded, size } = useContext<MainContextProps>(MainContext)
  const { setEnable, setRemovePoints } = useContext<any>(LayersContext)
  const { createGridBoxes, fixPositionCenter, getCell } = useContext<GridContextProps>(GridContext)
  const {
    createLayerPoint,
    current,
    layers,
    updateLayer,
    updateLayerPoint,
  } = useContext<any>(LayersContext)

  console.info('INIT')

  // render
  return (
    <MainSection
      onKeyUp={() => {
        setEnable(false)
        setRemovePoints(false)
      }}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.shiftKey && event.altKey) {
          setRemovePoints(true)
        }

        if (event.shiftKey) {
          setEnable(true)
          console.info(event, 'ADD POINT')
        }
      }}
      tabindex={1}
    >
      {loaded === true && size.height > 0 && size.width > 0 &&
        <Stage
          className="stage"
          tabIndex={0}
          height={size.height}
          onClick={
            (event: KonvaEventObject<MouseEvent>) => {
              event.cancelBubble = true

              const values = getCell(event.evt.clientX, event.evt.clientY, size.width, size.height)

              if (values) {
                createLayerPoint(
                  layers[current].points.length + 1,
                  {
                    x: values[0] + values[2] / 2,
                    y: values[1] + values[2] / 2,
                  }
                )
              }
            }
          }
          width={size.width}
        >
          <LayerKonva>
            <Grid createGridBoxes={createGridBoxes} {...size} />

            {Array.isArray(layers) && layers.map((layer: any, index: number) =>
              <Layer
                {...layer}
                active={current === index}
                getCell={getCell}
                index={index}
                layer={layer}
                key={index}
                fixPositionCenter={fixPositionCenter}
                updateLayer={updateLayer}
                updateLayerPoint={updateLayerPoint}
              />
            )}
          </LayerKonva>
        </Stage>}

        {Array.isArray(layers) && <Controls />}
    </MainSection>
  );
};

export default Main