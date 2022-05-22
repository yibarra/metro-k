import React, { useState } from 'react'
import SelectorColor from '../../../SelectorColor'

const ControlsLayersItem: React.FC<any> = ({
  current,
  disabledDelete = true,
  deleteLayer,
  index,
  layer,
  setCurrent,
  updateLayer,
}) => {
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

      <div>
        <label>line</label>

        <div>
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

          <div>
            <p>color</p>
            <SelectorColor
              color={layer.lineProperties.color}
              setColor={(color: string) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                color,
              }})}
              type="line"
            />
          </div>

          <div>
            <p>lineJoin</p>
            <select
              onChange={(e) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                lineJoin: e.target.value,
              }})}
              value={layer.lineProperties.lineJoin}
            >
              <option value="miter">miter</option>
              <option value="round">round</option>
              <option value="bevel">bevel</option>
            </select>
          </div>

          <div>
            <p>lineCap</p>
            <select
              onChange={(e) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                lineCap: e.target.value,
              }})}
              value={layer.lineProperties.lineCap}
            >
              <option value="butt">butt</option>
              <option value="round">round</option>
              <option value="square">square</option>
            </select>
          </div>

          <div>
            <p>dash</p>
            <input
              name="dash0"
              type="number"
              defaultValue="0"
              onChange={(e) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                dash: [e.target.value, layer.lineProperties.dash[1]]
              }})}
            />

            <input
              name="dash1"
              type="number"
              defaultValue="0"
              onChange={(e) => updateLayer(index, { lineProperties: {
                ...layer.lineProperties,
                dash: [layer.lineProperties.dash[0], e.target.value]
              }})}
            />
          </div>

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
      </div>

      <div>
        <label>points</label>

        <div>
          <p>background</p>

          <SelectorColor
            color={layer.pointsProperties.stroke}
            setColor={(fill: string) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              fill,
            }})}
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

        <div>
          <p>lineJoin</p>
          <select
            onChange={(e) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              lineJoin: e.target.value,
            }})}
            value={layer.pointsProperties.lineJoin}
          >
            <option value="miter">miter</option>
            <option value="round">round</option>
            <option value="bevel">bevel</option>
          </select>
        </div>

        <div>
          <p>lineCap</p>
          <select
            onChange={(e) => updateLayer(index, { pointsProperties: {
              ...layer.pointsProperties,
              lineCap: e.target.value,
            }})}
            value={layer.pointsProperties.lineCap}
          >
            <option value="butt">butt</option>
            <option value="round">round</option>
            <option value="square">square</option>
          </select>
        </div>

        <div>
            <p>dash</p>
            <input
              name="dash0"
              type="number"
              defaultValue="0"
              onChange={(e) => updateLayer(index, { pointsProperties: {
                ...layer.pointsProperties,
                dash: [e.target.value, layer.pointsProperties.dash[1]]
              }})}
            />

            <input
              name="dash1"
              type="number"
              defaultValue="0"
              onChange={(e) => updateLayer(index, { pointsProperties: {
                ...layer.pointsProperties,
                dash: [layer.pointsProperties.dash[0], e.target.value]
              }})}
            />
          </div>
      </div>
    </div>
  )
}

export default ControlsLayersItem
