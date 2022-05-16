import React from 'react'
import ControlsLayersItem from '../ControlsLayersItem'

const ControlsLayersContent: React.FC<any> = ({
  current,
  layers,
  deleteLayer,
  updateLayer,
  setCurrent
}) => {
  return (
    <div>
      {layers && layers.map((item: any, index: number) =>
        <ControlsLayersItem
          current={current === index}
          disabledDelete={layers.length <= 1}
          deleteLayer={deleteLayer}
          index={index}
          key={index}
          layer={item}
          setCurrent={setCurrent}
          updateLayer={updateLayer}
        />)}
    </div>
  )
}

export default ControlsLayersContent
