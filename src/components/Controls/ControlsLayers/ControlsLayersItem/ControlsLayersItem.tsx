import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

const ControlsLayersItem: React.FC<any> = ({
  current,
  disabledDelete = true,
  deleteLayer,
  index,
  layer,
  setCurrent,
  updateLayer,
}) => {
  const [color, setColor] = useState<string>(layer.lineProperties.color)
  const [openColor, setOpenColor] = useState<boolean>(false)
  const [name, setName] = useState<string>(layer.name ?? '')

  // render
  return (
    <div>
      <input
        type="text"
        defaultValue={name}
        onChange={(e) => updateLayer(current, { name: e.currentTarget.value })}
      />
      <button
        disabled={disabledDelete}
        onClick={() => deleteLayer(current)}
      >x</button>
      <button onClick={() => setCurrent(index)}>
        active
      </button>
      <div>
        <label>line properties</label>
        <div>
          {openColor && (
            <HexColorPicker color={color} onChange={(e) => {
              setOpenColor(false)
              setColor(e)
            }} />
          )}
          <button onClick={() => setOpenColor(!openColor)}>background</button>
          <button>border</button>
        </div>
      </div>
      <div>
        <label>cor properties</label>
      </div>
    </div>
  )
}

export default ControlsLayersItem
