import React from 'react'

import SelectorColor from '../../../SelectorColor'
import SelectorDash from '../../../SelectorDash'
import SelectorLineType from '../../../SelectorLineType'

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

  const updateLayerPointJoinProperties = (lineJoin: number) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineJoin,
    }})
  }

  const updateLayerPointCapProperties = (lineCap: number) => {
    updateLayer(index, { pointsProperties: {
      ...layer.pointsProperties,
      lineCap,
    }})
  }

  const updateLayerLineJoinProperties = (lineJoin: number) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineJoin,
    }})
  }

  const updateLayerLineCapProperties = (lineCap: number) => {
    updateLayer(index, { lineProperties: {
      ...layer.lineProperties,
      lineCap,
    }})
  }

  // render
  return (
    <div style={{ border: current ? '1px solid red' : '' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <div>
          <p>width</p>
          <input
            name="size-line"
            min={2}
            max={10}
            type="number"
            defaultValue="2"
            onChange={(e) => updateLayer(index, { lineProperties: {
              ...layer.lineProperties,
              strokeWidth: parseInt(e.target.value, 10),
            }})}
          />
        </div>
        
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
          items={[{ name: 'round' }, { name: 'butt'}, { name: 'square' }]}
          variant="cap"
        />

        <SelectorLineType
          onChangeValue={updateLayerLineJoinProperties}
          items={[{ name: 'miter' }, { name: 'round'}, { name: 'bevel' }]}
        />
      </div>

      <div>
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

      <div>
        <div style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
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

        <div>
          <p>size</p>

          <input
            name="size-point"
            min={3}
            max={10}
            type="number"
            defaultValue="3"
            onChange={(e) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              radius: parseInt(e.target.value, 10),
            }})}
          />
        </div>
      </div>
    </div>
  )
}

export default ControlsLayersItem
