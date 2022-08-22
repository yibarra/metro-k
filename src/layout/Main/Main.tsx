import React, { useContext } from 'react'
import Stage from './Stage'

import Header from '../Header'
import { MainContext } from '../../providers/MainProvider/MainProvider'
import type { MainContextProps } from '../../providers/MainProvider/interfaces'
import { MainSection } from './styles'

// main
const Main: React.FC = () => {
  const {
    loaded,
    remove,
    size,
    setEnable,
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
  }

  // on key up
  const onKeyUp = (_: KeyboardEvent): void => {
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
          <Stage remove={remove} size={size} />
        </>
      }
    </MainSection>
  );
};

export default Main