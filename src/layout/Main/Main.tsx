import React, { useContext } from 'react'
import { Stage, Layer as LayerKonva } from 'react-konva'

import Grid from '../../components/Grid'
import Layer from '../../components/Layer'
import { GridContext } from '../../providers/GridProvider/GridProvider'
import { MainContext } from '../../providers/MainProvider/MainProvider'

import { MainSection } from './styles'
import { LayersContext } from '../../providers/LayersProvider/LayersProvider'
import Controls from '../../components/Controls'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import type { KonvaEventObject } from 'konva/lib/Node'

// main
const Main: React.FC<any> = () => {
  const { loaded, size } = useContext<MainContextProps>(MainContext)
  const { boxes, getCell } = useContext<any>(GridContext)
  const {
    current,
    layers,
    createLayerPoint,
    updateLayer,
    updateLayerPoint,
  } = useContext<any>(LayersContext)

  // render
  return (
    <MainSection>
      {loaded === true && size.height > 0 && size.width > 0 &&
        <Stage
          className="stage"
          height={size.height}
          onClick={
            ({ evt }: KonvaEventObject<MouseEvent>) => {
              const values = getCell(evt.clientX, evt.clientY)

              if (values) {
                createLayerPoint(
                  layers[current].points.length + 1,
                  {
                    x: values[0] + values[2] / 2,
                    y: values[1] + values[2] / 2
                  }
                )
              }
            }
          }
          width={size.width}
        >
          <LayerKonva>
            {boxes.length > 0 && <Grid boxes={boxes} {...size} />}

            {Array.isArray(layers) && layers.map((layer: any, index: number) =>
              <Layer
                active={current === index}
                layer={layer}
                index={index}
                key={index}
                updateLayer={updateLayer}
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