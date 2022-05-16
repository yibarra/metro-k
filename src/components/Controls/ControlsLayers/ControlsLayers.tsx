import React, { useContext } from 'react'
import { LayersContext } from '../../../providers/LayersProvider/LayersProvider'
import ControlsLayersContent from './ControlsLayersContent'

// controls layers
const ControlsLayers: React.FC<any> = () => {
  const { layers, current, deleteLayer, updateLayer, setCurrent } = useContext(LayersContext)

  // render
  return (
    <div>
      {layers && (
        <ControlsLayersContent
          current={current}
          layers={layers}
          deleteLayer={deleteLayer}
          updateLayer={updateLayer}
          setCurrent={setCurrent}
        />)}
    </div>
  )
}

export default ControlsLayers
