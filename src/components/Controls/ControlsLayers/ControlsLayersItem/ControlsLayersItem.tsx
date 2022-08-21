import React from 'react'

import SelectorColor from '../../../SelectorColor'
import SelectorDash from '../../../SelectorDash'
import SelectorLineType from '../../../SelectorLineType'
import SelectorSize from '../../../SelectorSize'

import * as S from './styles'

// controls layers item
const ControlsLayersItem: React.FC<any> = ({
  current,
  disabledDelete = true,
  deleteLayer,
  index,
  layer,
  setCurrent,
  updateLayer,
}) => {

  const updateLineDashProperties = (properties: any, dash: number[]) => {
    updateLayer(index, { lineProperties: {
      ...properties,
      dash,
    }})
  }

  const updatePointsDashProperties = (properties: any, dash: number[]) => {
    updateLayer(index, { pointsProperties: {
      ...properties,
      dash,
    }})
  }

  const updateLayerPointJoinProperties = (lineJoin: string) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineJoin,
    }})
  }

  const updateLayerPointCapProperties = (lineCap: string) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineCap,
    }})
  }

  const updateLayerLineJoinProperties = (lineJoin: string) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineJoin,
    }})
  }

  const updateLayerLineCapProperties = (lineCap: string) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineCap,
    }})
  }

  const updateLayerSizeLineProperties = (strokeWidth: number) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      strokeWidth,
    }})
  }

  const updateLayerStrokeWidthPointsProperties = (strokeWidth: number) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      strokeWidth,
    }})
  }

  const updateLayerSizePointsProperties = (radius: number) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      radius,
    }})
  }

  // render
  return (
    <S.ControlsLayersItemDiv style={{ border: current ? '1px solid red' : '' }}>
      <S.ControlsLayersItemHeaderDiv>
        <input
          type="text"
          defaultValue={layer.name}
          onChange={(e) => updateLayer(index, { name: e.currentTarget.value })}
        />

        <button>
          <span className="material-symbols-rounded" data-any="_off">
            visibility
          </span>
        </button>

        <button
          disabled={disabledDelete}
          onClick={() => deleteLayer(index)}
        >
          <span className="material-symbols-rounded">
            delete_forever
          </span>
        </button>

        <button onClick={() => setCurrent(index)}>
          active
        </button>
      </S.ControlsLayersItemHeaderDiv>

      <S.ControlsLayersItemContainer toggle={current ? 'true' : 'false'}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 5, justifyContent: 'flex-start' }}>
          <SelectorSize
            strokeColor={layer.lineProperties.stroke}
            onChangeValue={updateLayerSizeLineProperties}
            value={layer.lineProperties.strokeWidth}
          />
          
          <SelectorColor
            color={layer.lineProperties.stroke}
            setColor={(stroke: string) => updateLayer(index, { lineProperties: {
              ...layer.lineProperties,
              stroke,
            }})}
            variation="line"
          />

          <SelectorDash
            index={index}
            properties={layer.lineProperties}
            updateDashProperty={updateLineDashProperties}
          />

          <SelectorLineType
            onChangeValue={updateLayerLineCapProperties}
            items={[{ name: 'round' }, { name: 'butt' }, { name: 'square' }]}
            variant="cap"
          />

          <SelectorLineType
            onChangeValue={updateLayerLineJoinProperties}
            items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
          />

          <div>
            <p>tension</p>
            <input
              name="tension"
              type="range"
              min={0}
              max={100}
              defaultValue="0"
              onChange={(e) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                tension: parseInt(e.target.value, 10) / 100
              }})}
            />
          </div>
        </div>

        <div style={{ display: 'inline-flex', gap: 5, alignItems: 'stretch', justifyContent: 'flex-start' }}>
          <SelectorSize
            fill={layer.pointsProperties.fill}
            onChangeValue={updateLayerSizePointsProperties}
            value={layer.pointsProperties.radius}
            variant="block"
          />

          <SelectorSize
            fill={layer.pointsProperties.fill}
            onChangeValue={updateLayerStrokeWidthPointsProperties}
            value={layer.pointsProperties.strokeWidth}
            variant="border"
          />

          <SelectorColor
            color={layer.pointsProperties.stroke}
            radius
            setColor={(stroke: string) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              stroke,
            }})}
            variation="border"
          />

          <SelectorColor
            color={layer.pointsProperties.fill}
            radius
            setColor={(fill: string) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              fill,
            }})}
          />

          <SelectorDash
            index={index}
            properties={layer.pointsProperties}
            updateDashProperty={updatePointsDashProperties}
          />

          <SelectorLineType
            items={[{ name: 'round' }, { name: 'butt'}, { name: 'square' }]}
            onChangeValue={updateLayerPointCapProperties}
            variant="cap"
          />

          <SelectorLineType
            items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
            onChangeValue={updateLayerPointJoinProperties}
          />
        </div>
      </S.ControlsLayersItemContainer>
    </S.ControlsLayersItemDiv>
  )
}

export default ControlsLayersItem
