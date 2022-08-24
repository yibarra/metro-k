import React, { useContext } from 'react'
import Stage from './Stage'

import Header from '../Header'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import { MainSection } from './styles'
import MenuPoint from '../../components/MenuPoint'

// main
const Main: React.FC = () => {
  const {
    curve,
    isDragging,
    loaded,
    remove,
    size,
    setCurve,
    setEnable,
    setIsDragging,
    setRemove,
  } = useContext<MainContextProps>(MainContext)

  console.info('INIT')

  // on key down
  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.shiftKey) {
      setEnable(true)
    }
    
    if (event.shiftKey && event.altKey) {
      setEnable(false)
      setRemove(true)
    }

    if (event.key === 'Meta') {
      setCurve(true)
    }
  }

  // on key up
  const onKeyUp = (_: KeyboardEvent): void => {
    setCurve(false)
    setEnable(false)
    setRemove(false)
  }

  // render
  return (
    <MainSection
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      tabindex={1}
    >
      <Header />

      {loaded === true && size.height > 0 && size.width > 0 &&
        <>
          <Stage
            curve={curve}
            isDragging={isDragging}
            remove={remove}
            setIsDragging={setIsDragging}
            size={size}
          />

          <MenuPoint isDragging={isDragging} />
        </>
      }
    </MainSection>
  );
};

export default Main